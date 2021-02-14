<template>
  <div
    v-if="loading"
    :class="{
      'hn-loading': true,
      'hn-loading--animate-background': animateBackground,
      'is-fullscreen': fullscreen,
      'is-absolute': absolute,
    }"
  >
    <icon
      icon="loading"
      class="hn-icon-loading"
      size="x3"
    />

    <span class="hn-loading__text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'Loading',
  components: {
    Icon,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    fullscreen: {
      type: Boolean,
      default: false,
    },

    absolute: {
      type: Boolean,
      default: false,
    },

    text: {
      type: String,
      default: 'Loading...',
    },

    animateBackground: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
