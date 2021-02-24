<template>
  <div
    v-if="story"
    class="hn-story--ask"
  >
    <div class="hn-story__header">
      <a
        v-if="story.url"
        :href="story.url"
        target="_blank"
        rel="no-opener"
        class="hn-story__heading"
      >
        {{ story.title }}
      </a>
      <h1 v-else class="hn-story__heading">
        {{ story.title }}
      </h1>
      <span class="hn-story__url hn-story__by">By {{ story.by }} {{ timeString }} ago</span>
      <span class="hn-story__url">{{ domain }}</span>
    </div>
    <div v-html="story.text" />

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
import Loading from '@/components/Loading.vue';
import getComments from '@/composables/getComments';
import onScroll from '@/composables/onScroll';
import Comment from '@/components/Comment.vue';
import TimeString from '@/composables/timeString';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
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
