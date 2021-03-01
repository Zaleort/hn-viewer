<template>
  <div
    v-if="story"
    class="hn-story"
  >
    <div class="hn-story__header">
      <a
        v-if="story.url"
        :href="story.url"
        target="_blank"
        rel="no-opener"
        class="hn-story__heading is-clickable"
      >
        {{ story.title }}
      </a>
      <h1 v-else class="hn-story__heading">
        {{ story.title }}
      </h1>
      <div class="hn-story__subheading">
        <span v-if="story.score >= 0" class="mr-4">
          <icon icon="chevronUp" size="small" />
          {{ story.score }}
        </span>
        <router-link :to="{ name: 'User', params: { id: story.by }}" class="hn-story__link mr-4">
          <icon icon="user" size="small" />
          {{ story.by }}
        </router-link>
        <span class="mr-4">
          <icon icon="clock" size="small" />
          {{ timeString }}
        </span>
        <span class="mr-4">
          <icon icon="link" size="small" />
          {{ domain }}
        </span>
        <router-link
          v-if="story.parent"
          :to="{ name: 'Story', params: { id: story.parent }}"
          class="hn-story__link"
        >
          <icon icon="sitemap" size="small" />
          Parent
        </router-link>
      </div>
    </div>
    <div v-html="story.text" />

    <h1 class="hn-story__comments-heading">
      Comments ({{ descendants }})
    </h1>

    <transition-group tag="div" name="hn-story">
      <comment
        v-for="(comment, index) of comments"
        :key="index"
        v-bind="comment"
      />
    </transition-group>
  </div>
  <loading :loading="loading" />
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref, watch,
} from 'vue';
import Icon from '@/components/Icon.vue';
import Loading from '@/components/Loading.vue';
import OnScroll from '@/composables/OnScroll';
import Comment from '@/components/Comment.vue';
import TimeString from '@/composables/TimeString';
import { useRoute } from 'vue-router';
import Item from '@/interfaces/Item';
import api from '@/lib/ApiStories';

export default defineComponent({
  name: 'Home',
  components: {
    Icon,
    Loading,
    Comment,
  },

  setup: () => {
    const story = ref<Item>();
    const comments = ref<Item[]>([]);
    const count = ref(0);
    const loading = ref(false);

    const { timeString, getTime } = TimeString();
    const id = ref();
    const route = useRoute();

    const descendants = computed(() => {
      if (!story.value || !story.value.kids) return 0;

      return story.value.descendants || story.value.kids.length;
    });

    const getStory = async () => {
      if (!id.value) return;

      loading.value = true;
      story.value = await api.getOne(id.value);
      loading.value = false;
    };

    const getComments = async (ids: number[], parent: Item) => {
      if (ids.length === 0 || !parent) return;
      parent.resolvedKids = ref([]).value;

      ids.forEach((commentId, index) => {
        api.getOne(commentId).then(
          comment => {
            if (!comment || !parent.resolvedKids) return;
            parent.resolvedKids[index] = comment;

            if (comment.kids && comment.kids.length > 0) {
              getComments(comment.kids, comment);
            }
          },
        );
      });
    };

    const getParentComments = async () => {
      if (!story.value || !story.value.kids) return;
      loading.value = true;

      for (let i = count.value; i < count.value + 10; i++) {
        const actualCount = count.value + 10;
        if (count.value >= story.value.kids.length) {
          loading.value = false;
          break;
        }

        api.getOne(story.value.kids[i]).then(
          comment => {
            if (!story.value || !comment) {
              loading.value = false;
              return;
            }

            comments.value[i] = comment;
            if (comment.kids && comment.kids.length > 0) {
              getComments(comment.kids, comment);
            }

            if (actualCount === count.value) {
              loading.value = false;
            }
          },

          error => console.error(error),
        );
      }

      count.value += 10;
    };

    const infiniteScroll = () => {
      const main = document.getElementById('main');
      if (!main || !story.value) return;

      const espacioVisto = main.scrollTop + window.innerHeight;
      if (espacioVisto >= main.scrollHeight && !loading.value && count.value < story.value.descendants) {
        getParentComments();
      }
    };

    const load = async () => {
      id.value = route.params.id;
      await getStory();

      if (story.value) {
        getTime(story.value.time);
        getParentComments();
      }
    };

    const domain = computed(() => {
      if (!story.value) return '';
      if (!story.value.url) return 'news.ycombinator.com';

      const url = new URL(story.value.url);
      return url.hostname;
    });

    OnScroll(infiniteScroll);

    onMounted(() => {
      load();
    });

    watch(() => route.params, async () => {
      comments.value = [];
      count.value = 0;
      load();
    });

    return {
      story,
      comments,
      descendants,
      count,
      loading,
      getStory,
      getParentComments,
      getComments,
      infiniteScroll,
      domain,
      timeString,
      getTime,
    };
  },
});
</script>
