import Item from '@/interfaces/Item';
import api from '@/lib/ApiStories';
import { ref } from 'vue';

export default () => {
  const story = ref<Item>();
  const count = ref(0);
  const loading = ref(false);

  const getStory = async (id: number) => {
    story.value = await api.getOne(id);
  };

  return {
    story,
    count,
    loading,
    getStory,
  };
};
