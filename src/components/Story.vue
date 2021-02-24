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
          v-else
          :to="{ name: 'Story', params: { id: id } }"
          class="hn-story__heading"
        >
          {{ title }}
        </router-link>
        <span class="hn-story__url">{{ domain }}</span>
      </div>

      <footer class="hn-story__footer">
        <span class="hn-story__by">By {{ by }} {{ timeString }} ago</span>
        <router-link
          v-if="hasDescendants"
          :to="{ name: 'Story', params: { id: id }}"
          :class="{
            'hn-story__comments': true,
            'is-commented': hasDescendants,
          }"
        >
          <icon
            icon="comment"
            color="primary"
            class="mr-1"
          />
          {{ descendants }}
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, watchEffect,
} from 'vue';
import Icon from '@/components/Icon.vue';
import TimeString from '@/composables/timeString';

export default defineComponent({
  name: 'Story',
  components: {
    Icon,
  },

  props: {
    index: {
      type: Number,
      default: 1,
    },

    by: {
      type: String,
      default: '...',
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
      default: 0,
    },

    title: {
      type: String,
      default: '...',
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
    const { timeString, setTimeString } = TimeString();
    const domain = computed(() => {
      if (!props.url) return 'news.ycombinator.com';

      const url = new URL(props.url);
      return url.hostname;
    });

    const hasDescendants = computed(() => props.descendants > 0);

    watchEffect(() => {
      setTimeString(props.time);
    });

    return {
      hasDescendants,
      domain,
      timeString,
      setTimeString,
    };
  },
});
</script>
