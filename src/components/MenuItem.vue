<template>
  <div
    v-if="action"
    class="hn-menu-item"
    @click="action; close"
  >
    <icon
      v-if="icon"
      :icon="icon"
      class="mr-2"
    />
    <span class="hn-menu-item__span">
      <slot />
    </span>
  </div>

  <router-link
    v-else-if="router"
    :to="to"
    class="hn-menu-item"
    @click="close"
  >
    <icon
      v-if="icon"
      :icon="icon"
      class="mr-2"
    />
    <span class="hn-menu-item__span">
      <slot />
    </span>
  </router-link>

  <a
    v-else
    :href="to"
    class="hn-menu-item"
    @click="close"
  >
    <icon
      v-if="icon"
      :icon="icon"
      class="mr-2"
    />
    <span class="hn-menu-item__span">
      <slot />
    </span>
  </a>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'MenuItem',
  components: {
    Icon,
  },

  props: {
    to: {
      type: [String, Object],
      default: null,
    },

    router: {
      type: Boolean,
      default: true,
    },

    action: {
      type: Function,
      default: null,
    },

    icon: {
      type: String,
      default: null,
    },
  },

  methods: {
    close() {
      this.$parent.closeOnAction();
    },
  },
});
</script>
