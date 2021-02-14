<template>
  <transition-group tag="div" name="hn-story">
    <story
      v-for="(story, index) of stories"
      :key="story.id"
      v-bind="story"
      :index="index"
    />
  </transition-group>
  <loading :loading="loading" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Story from '@/components/Story.vue';
import Loading from '@/components/Loading.vue';
import Item from '@/interfaces/Item';
import api from '@/lib/ApiStories';

export default defineComponent({
  name: 'Home',
  components: {
    Story,
    Loading,
  },

  setup: () => {
    const stories = ref<Item[]>([]);
    const storiesIds = ref<number[]>([]);
    const count = ref(0);
    const loading = ref(false);

    const getStories = async () => {
      if (!storiesIds.value || storiesIds.value.length === 0) return;
      loading.value = true;

      const promises = [];

      for (let i = count.value; i < count.value + 20; i++) {
        promises.push(api.getOne(storiesIds.value[i]));
      }

      count.value += 20;
      const values: Item[] = await Promise.all(promises);

      values.forEach(story => {
        const index = storiesIds.value.indexOf(story.id);
        stories.value[index] = story;
      });

      loading.value = false;
    };

    const getIds = async () => {
      storiesIds.value = await api.getTop();
      getStories();
    };

    onMounted(() => {
      getIds();
    });

    return {
      stories,
      count,
      getIds,
      getStories,
      loading,
    };
  },
});
</script>
