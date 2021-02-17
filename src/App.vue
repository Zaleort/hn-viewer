<template>
  <topbar>
    <icon
      class="clickable"
      icon="hamburger"
      color="white"
      @click="menuVisible = !menuVisible"
    />
  </topbar>
  <div class="hn-container">
    <Menu
      v-model:visible="menuVisible"
      v-model:collapsed="menuCollapsed"
      hamburger
    >
      <menu-item icon="hot" :to="{ name: 'Home' }">
        Top
      </menu-item>
      <menu-item icon="crown" :to="{ name: 'Best' }">
        Best
      </menu-item>
      <menu-item icon="exclamation" :to="{ name: 'New' }">
        New
      </menu-item>
      <menu-item icon="question" :to="{ name: 'Ask' }">
        Ask
      </menu-item>
      <menu-item icon="eye" :to="{ name: 'Show' }">
        Show
      </menu-item>
      <menu-item icon="briefcase" :to="{ name: 'Jobs' }">
        Jobs
      </menu-item>
    </Menu>

    <main id="main" class="hn-main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/components/Menu.vue';
import MenuItem from '@/components/MenuItem.vue';
import Topbar from '@/components/Topbar.vue';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    MenuItem,
    Topbar,
    Icon,
  },

  data() {
    return {
      menuVisible: false,
      menuCollapsed: false,
    };
  },
});
</script>
