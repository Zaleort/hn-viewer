<template>
  <div
    :class="{
      'hn-comment': true,
      'is-level-1': level === 1,
    }"
  >
    <div
      :class="{
        [`hn-comment__content--level-${level}`]: true,
        'hn-comment__content': true,
      }"
    >
      <span class="hn-comment__by">
        <router-link :to="{ name: 'User', params: { id: by }}">{{ by }}</router-link>
        - {{ timeString }}
      </span>
      <div v-html="text" />
    </div>

    <comment
      v-for="(kid, index) of resolvedKids"
      :key="index"
      v-bind="kid"
      :level="level + 1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import TimeString from '@/composables/TimeString';

export default defineComponent({
  name: 'Comment',
  props: {
    level: {
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

    kids: {
      type: Array,
      default: () => [],
    },

    resolvedKids: {
      type: Array,
      default: () => [],
    },

    parent: {
      type: Number,
      default: null,
    },

    text: {
      type: String,
      default: '',
    },

    time: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: 'comment',
    },
  },

  setup(props) {
    const { timeString, setTimeString } = TimeString();

    watchEffect(() => {
      setTimeString(props.time);
    });

    return {
      timeString,
      setTimeString,
    };
  },
});
</script>
