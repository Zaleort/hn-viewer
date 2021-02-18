<template>
  <div class="hn-story">
    <div class="hn-story__ribbon">
      <span>{{ index + 1 }}</span>
      <span class="hn-story__score">{{ score }}p</span>
    </div>

    <div class="hn-story__content">
      <div class="hn-story__header">
        <a
          v-if="url"
          :href="url"
          target="_blank"
          rel="no-opener"
          class="hn-story__heading"
        >
          {{ title }}
        </a>
        <router-link
          v-if="!url && text"
          :to="{ name: 'Story', params: { id: id } }"
          class="hn-story__heading"
        >
          {{ title }}
        </router-link>
        <span class="hn-story__url">{{ domain }}</span>
      </div>

      <footer class="hn-story__footer">
        {{ by }}
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Story',
  props: {
    index: {
      type: Number,
      default: 1,
    },

    by: {
      type: String,
      default: null,
    },

    id: {
      type: Number,
      default: null,
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    time: {
      type: Number,
      default: null,
    },

    text: {
      type: String,
      default: null,
    },

    url: {
      type: String,
      default: null,
    },

    score: {
      type: Number,
      default: null,
    },

    title: {
      type: String,
      default: null,
    },

    kids: {
      type: Array,
      default: () => [],
    },

    type: {
      type: String,
      default: 'story',
    },

    descendants: {
      type: Number,
      default: null,
    },
  },

  setup(props) {
    const domain = computed(() => {
      if (!props.url) return 'news.ycombinator.com';

      const url = new URL(props.url);
      return url.hostname;
    });

    return {
      domain,
    };
  },
});
</script>
