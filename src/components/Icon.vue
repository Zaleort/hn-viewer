<template v-if="iconComponent">
  <svg
    :class="{
      'hn-icon': true,
      [`hn-icon--${size}`]: true,
      [`hn-icon--${color}`]: color !== null,
    }"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox || iconComponent.viewBox"
    :aria-labelledby="icon"
    role="presentation"
  >
    <title
      :id="icon"
      lang="es"
    >
      {{ description }}
    </title>
    <g :fill="fill">
      <component :is="iconComponent.node" />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import icons from '@/components/icons/icons';
import { Icons } from '@/interfaces/Icons';

export default defineComponent({
  name: 'Icon',
  props: {
    viewBox: {
      type: String,
      default: null,
    },

    icon: {
      type: String,
      default: 'icon',
    },

    color: {
      type: String,
      default: null,
    },

    fill: {
      type: String,
      default: 'currentColor',
    },

    size: {
      type: String,
      default: 'normal',
    },

    description: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const iconComponent = computed(() => (icons as Icons)[props.icon]);
    return { iconComponent };
  },
});
</script>
