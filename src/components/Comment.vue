<template>
  <div
    v-show="!deleted"
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

      <div
        v-if="kids.length"
        class="hn-comment__show-comments"
        @click="toggleKids = !toggleKids"
      >
        <icon
          icon="chevronDown"
          :class="{
            'mr-1': true,
            'hn-icon--upside': !toggleKids
          }"
        />
        {{ kids.length }} {{ kids.length === 1 ? 'comment' : 'comments' }}
      </div>
    </div>
    <transition-group tag="div" name="hn-story">
      <comment
        v-for="(kid, index) of resolvedKids"
        v-show="toggleKids"
        :key="index"
        v-bind="kid"
        :level="level + 1"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import Icon from '@/components/Icon.vue';
import TimeString from '@/composables/TimeString';

export default defineComponent({
  name: 'Comment',
  components: {
    Icon,
  },

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

    deleted: {
      type: Boolean,
      default: false,
    },

    dead: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { timeString, setTimeString } = TimeString();
    const toggleKids = ref(true);

    watchEffect(() => {
      setTimeString(props.time);
    });

    return {
      timeString,
      setTimeString,
      toggleKids,
    };
  },
});
</script>
