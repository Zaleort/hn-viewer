<template>
  <div
    v-if="story"
    class="hn-story--ask"
    v-html="story.text"
  />
  <transition-group tag="div" name="hn-story">
    <comment
      v-for="(comment, index) of comments"
      :key="index"
      v-bind="comment"
      :index="index"
    />
  </transition-group>
  <loading :loading="loading" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Loading from '@/components/Loading.vue';
import getComments from '@/composables/getComments';
import onScroll from '@/composables/onScroll';
import Comment from '@/components/Comment.vue';
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

    const id = ref();
    id.value = useRoute().params.id;

    onMounted(async () => {
      await getStory(id.value);
    });

    return {
      story,
      count,
      getStory,
      loading,
    };
  },
});
</script>
