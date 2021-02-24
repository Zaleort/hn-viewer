import api from '@/lib/ApiService';

const url = 'https://hacker-news.firebaseio.com/v0/';

export default {
  getNew: () => api.get(`${url}newstories.json`),
  getTop: () => api.get(`${url}topstories.json`),
  getBest: () => api.get(`${url}beststories.json`),
  getAsk: () => api.get(`${url}askstories.json`),
  getShow: () => api.get(`${url}showstories.json`),
  getJob: () => api.get(`${url}jobstories.json`),
  getOne: (id: number) => api.get(`${url}item/${id}.json`),
  getUser: (id: number) => api.get(`${url}user/${id}.json`),
};
