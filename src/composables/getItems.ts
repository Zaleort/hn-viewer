import Item from '@/interfaces/Item';
import api from '@/lib/ApiStories';
import { ref } from 'vue';

export default () => {
  const stories = ref<Item[]>([]);
  const storiesIds = ref<number[]>([]);
  const count = ref(0);
  const loading = ref(false);

  const getStories = async () => {
    if (!storiesIds.value || storiesIds.value.length === 0) return;
    loading.value = true;

    for (let i = count.value; i < count.value + 20; i++) {
      if (count.value >= storiesIds.value.length) break;

      api.getOne(storiesIds.value[i]).then(
        story => {
          const index = storiesIds.value.indexOf(story.id);
          stories.value[index] = story;
        },

        error => console.error(error),
      );
    }

    count.value += 20;
    loading.value = false;
  };

  const getTopIds = async () => {
    storiesIds.value = await api.getTop();
    getStories();
  };

  const getBestIds = async () => {
    storiesIds.value = await api.getBest();
    getStories();
  };

  const getNewIds = async () => {
    storiesIds.value = await api.getNew();
    getStories();
  };

  const getAskIds = async () => {
    storiesIds.value = await api.getAsk();
    getStories();
  };

  const getShowIds = async () => {
    storiesIds.value = await api.getShow();
    getStories();
  };

  const getJobIds = async () => {
    storiesIds.value = await api.getJob();
    getStories();
  };

  const infiniteScroll = () => {
    const main = document.getElementById('main');
    if (!main) return;

    const espacioVisto = main.scrollTop + window.innerHeight;
    if (espacioVisto > main.scrollHeight - 100 && !loading.value) {
      getStories();
    }
  };

  return {
    stories,
    storiesIds,
    count,
    loading,
    getTopIds,
    getBestIds,
    getNewIds,
    getAskIds,
    getShowIds,
    getJobIds,
    getStories,
    infiniteScroll,
  };
};
