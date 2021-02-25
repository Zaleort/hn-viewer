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
        <span class="mr-4">
          <icon icon="chevronUp" size="small" />
          {{ story.score }}
        </span>
        <span class="mr-4">
          <icon icon="user" size="small" />
          {{ story.by }}
        </span>
        <span class="mr-4">
          <icon icon="clock" size="small" />
          {{ timeString }}
        </span>
        <span class="mr-4">
          <icon icon="link" size="small" />
          {{ domain }}
        </span>
      </div>
    </div>
    <div v-html="story.text" />

    <h1 class="hn-story__comments-heading">
      Comments ({{ story.descendants }})
    </h1>

    <transition-group tag="div" name="hn-story">
      <comment
        v-for="(comment, index) of comments"
        :key="index"
        v-bind="comment"
        :index="index"
      />
    </transition-group>
  </div>
  <loading :loading="loading" />
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import Icon from '@/components/Icon.vue';
import Loading from '@/components/Loading.vue';
import getComments from '@/composables/getComments';
import onScroll from '@/composables/onScroll';
import Comment from '@/components/Comment.vue';
import TimeString from '@/composables/timeString';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    Icon,
    Loading,
    Comment,
  },

  setup: () => {
    const {
      story, count, loading, getStory,
    } = getComments();

    const { timeString, setTimeString } = TimeString();
    const id = ref();
    id.value = useRoute().params.id;

    const domain = computed(() => {
      if (!story.value) return '';
      if (!story.value.url) return 'news.ycombinator.com';

      const url = new URL(story.value.url);
      return url.hostname;
    });

    onMounted(async () => {
      await getStory(id.value);

      if (story.value) {
        setTimeString(story.value.time);
      }
    });

    return {
      story,
      count,
      domain,
      getStory,
      timeString,
      setTimeString,
      loading,
    };
  },
});
</script>
