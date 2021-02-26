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
      const actualCount = count.value + 20;
      if (count.value >= storiesIds.value.length) break;

      api.getOne(storiesIds.value[i]).then(
        story => {
          stories.value[i] = story;

          // Evita llamadas infinitas en caso de que el usuario intente mantener
          // el scroll siempre al final de la página
          if (actualCount === count.value) {
            loading.value = false;
          }
        },

        error => console.error(error),
      );
    }

    count.value += 20;
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
    if (espacioVisto >= main.scrollHeight && !loading.value && count.value < storiesIds.value.length) {
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
