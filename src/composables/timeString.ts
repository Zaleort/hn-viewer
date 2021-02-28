import { ref } from 'vue';

export default () => {
  const timeString = ref<string>();
  const getTime = (unixTime: number): string => {
    const now = Date.now();
    const time = (now / 1000) - unixTime;
    const minutes = time / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    let rounded = 0;

    if (days > 1) {
      rounded = Math.floor(days);
      timeString.value = `${rounded}d`;
      return timeString.value;
    }

    if (hours > 1) {
      rounded = Math.floor(hours);
      timeString.value = `${rounded}h`;
      return timeString.value;
    }

    rounded = Math.floor(minutes);
    timeString.value = `${rounded}m`;
    return timeString.value;
  };

  const getDate = (unixTime: number): string => {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();

    let month: string | number = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;

    let day: string | number = date.getDate();
    if (day < 10) day = `0${day}`;

    timeString.value = `${day}/${month}/${year}`;
    return timeString.value;
  };

  return {
    timeString,
    getTime,
    getDate,
  };
};
