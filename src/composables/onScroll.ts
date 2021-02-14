import { onMounted, onUnmounted } from 'vue';

export default (method: any) => {
  onMounted(() => {
    const main = document.getElementById('main');
    if (!main) return;

    main.addEventListener('scroll', method);
  });

  onUnmounted(() => {
    const main = document.getElementById('main');
    if (!main) return;

    main.removeEventListener('scroll', method);
  });
};
