<template>
  <div v-if="user" class="hn-user">
    <h1 class="hn-user__name">{{ user.id }}</h1>
    <div class="hn-story__subheading">
      <span class="mr-4">
        <icon icon="chevronUp" size="small" />
        {{ user.karma }}
      </span>
      <span>
        <icon icon="clock" size="small" />
        {{ timeString }}
      </span>
    </div>

    <div v-html="user.about" />

    <h2 class="hn-story__comments-heading">
      Posts ({{ user.submitted.length }})
    </h2>

    <user-post
      v-for="(post, index) of posts"
      :key="index"
      v-bind="post"
    />
  </div>

  <loading :loading="loading" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import UserPost from '@/components/UserPost.vue';
import Icon from '@/components/Icon.vue';
import User from '@/interfaces/User';
import Item from '@/interfaces/Item';
import TimeString from '@/composables/TimeString';
import OnScroll from '@/composables/OnScroll';
import api from '@/lib/ApiStories';

export default defineComponent({
  name: 'User',
  components: {
    Loading,
    UserPost,
    Icon,
  },

  setup: () => {
    const user = ref<User>();
    const posts = ref<Item[]>([]);
    const count = ref(0);
    const loading = ref(false);

    const { timeString, getDate } = TimeString();
    const id = ref();
    id.value = useRoute().params.id;

    const getUser = async () => {
      if (!id.value) return;

      loading.value = true;
      user.value = await api.getUser(id.value);
      loading.value = false;
    };

    const getPosts = async () => {
      if (!user.value || user.value.submitted.length === 0) return;
      loading.value = true;

      for (let i = count.value; i < count.value + 10; i++) {
        const actualCount = count.value + 10;
        if (count.value >= user.value.submitted.length) break;

        api.getOne(user.value.submitted[i]).then(
          item => {
            if (!user.value || !item) {
              loading.value = false;
              return;
            }

            posts.value[i] = item;

            if (actualCount === count.value) {
              loading.value = false;
            }
          },

          error => console.error(error),
        );
      }

      count.value += 10;
    };

    const infiniteScroll = () => {
      const main = document.getElementById('main');
      if (!main || !user.value) return;

      const espacioVisto = main.scrollTop + window.innerHeight;
      if (espacioVisto >= main.scrollHeight && !loading.value && count.value < user.value.submitted.length) {
        getPosts();
      }
    };

    OnScroll(infiniteScroll);

    onMounted(async () => {
      await getUser();

      if (user.value) {
        getDate(user.value.created);
        getPosts();
      }
    });

    return {
      user,
      posts,
      count,
      loading,
      getUser,
      getPosts,
      timeString,
      getDate,
    };
  },
});
</script>
