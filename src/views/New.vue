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
import getItems from '@/composables/getItems';
import onScroll from '@/composables/onScroll';

export default defineComponent({
  name: 'New',
  components: {
    Story,
    Loading,
  },

  setup: () => {
    const {
      stories, storiesIds, count, loading, getStories, getNewIds, infiniteScroll,
    } = getItems();

    onScroll(infiniteScroll);

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
