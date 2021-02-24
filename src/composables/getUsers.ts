import User from '@/interfaces/User';
import api from '@/lib/ApiStories';
import { ref } from 'vue';

export default () => {
  const user = ref<User>();
  const loading = ref(false);

  const getUser = async (id: number) => {
    loading.value = true;
    user.value = await api.getUser(id);
    loading.value = false;
  };

  return {
    user,
    loading,
    getUser,
  };
};
