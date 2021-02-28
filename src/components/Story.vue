<template>
  <div class="hn-story-card">
    <div class="hn-story-card__ribbon">
      <span class="hn-story-card__index">{{ index + 1 }}</span>
      <span class="hn-story-card__score">{{ score }}p</span>
    </div>

    <div class="hn-story-card__content">
      <div class="hn-story-card__header">
        <a
          v-if="url"
          :href="url"
          target="_blank"
          rel="no-opener"
          class="hn-story-card__heading"
        >
          {{ title }}
        </a>
        <router-link
          v-else
          :to="{ name: 'Story', params: { id: id } }"
          class="hn-story-card__heading"
        >
          {{ title }}
        </router-link>
        <span class="hn-story-card__url">{{ domain }}</span>
      </div>

      <footer class="hn-story-card__footer">
        <router-link
          :to="{ name: 'User', params: { id: by } }"
          class="hn-story-card__icon-group is-clickable"
        >
          <icon icon="user" class="mr-1" />
          {{ by }}
        </router-link>
        <span class="hn-story-card__icon-group">
          <icon icon="clock" class="mr-1" />
          {{ timeString }}
        </span>
        <router-link
          v-if="hasDescendants"
          :to="{ name: 'Story', params: { id: id }}"
          :class="{
            'hn-story-card__icon-group': true,
            'is-clickable': hasDescendants,
          }"
        >
          <icon
            icon="comment"
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
import TimeString from '@/composables/TimeString';

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
    const { timeString, getTime } = TimeString();
    const domain = computed(() => {
      if (!props.url) return 'news.ycombinator.com';

      const url = new URL(props.url);
      return url.hostname;
    });

    const hasDescendants = computed(() => props.descendants > 0);

    watchEffect(() => {
      getTime(props.time);
    });

    return {
      hasDescendants,
      domain,
      timeString,
      getTime,
    };
  },
});
</script>
