<template>
  <transition-group tag="div" name="hn-story">
    <story
      v-for="(story, index) of stories"
      :key="index"
      v-bind="story"
      :index="index"
    />
  </transition-group>
  <loading :loading="loading" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Story from '@/components/Story.vue';
import Loading from '@/components/Loading.vue';
import Stories from '@/composables/Stories';
import OnScroll from '@/composables/OnScroll';

export default defineComponent({
  name: 'New',
  components: {
    Story,
    Loading,
  },

  setup: () => {
    const {
      stories, storiesIds, count, loading, getStories, getNewIds, infiniteScroll,
    } = Stories();

    OnScroll(infiniteScroll);

    onMounted(() => {
      getNewIds();
    });

    return {
      stories,
      storiesIds,
      count,
      getNewIds,
      getStories,
      loading,
    };
  },
});
</script>
