import { ref } from 'vue';

export default () => {
  const timeString = ref<string>();
  const setTimeString = (unixTime: number) => {
    const now = Date.now();
    const time = (now / 1000) - unixTime;
    const minutes = time / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    let rounded = 0;

    if (days > 1) {
      rounded = Math.floor(days);
      timeString.value = rounded === 1 ? `${rounded} day` : `${rounded} days`;
      return timeString.value;
    }

    if (hours > 1) {
      rounded = Math.floor(hours);
      timeString.value = rounded === 1 ? `${rounded} hour` : `${rounded} hours`;
      return timeString.value;
    }

    rounded = Math.floor(minutes);
    timeString.value = rounded === 1 ? `${rounded} minute` : `${rounded} minutes`;
    return timeString.value;
  };

  return {
    timeString,
    setTimeString,
  };
};
