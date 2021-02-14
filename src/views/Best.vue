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
  name: 'Best',
  components: {
    Story,
    Loading,
  },

  setup: () => {
    const {
      stories, storiesIds, count, loading, getStories, getBestIds, infiniteScroll,
    } = getItems();

    onScroll(infiniteScroll);

    onMounted(() => {
      getBestIds();
    });

    return {
      stories,
      storiesIds,
      count,
      getBestIds,
      getStories,
      loading,
    };
  },
});
</script>
