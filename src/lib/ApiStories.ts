import Item from '@/interfaces/Item';
import User from '@/interfaces/User';
import api from '@/lib/ApiService';

const url = 'https://hacker-news.firebaseio.com/v0/';

export default {
  getNew: (): Promise<number[]> => api.get(`${url}newstories.json`),
  getTop: (): Promise<number[]> => api.get(`${url}topstories.json`),
  getBest: (): Promise<number[]> => api.get(`${url}beststories.json`),
  getAsk: (): Promise<number[]> => api.get(`${url}askstories.json`),
  getShow: (): Promise<number[]> => api.get(`${url}showstories.json`),
  getJob: (): Promise<number[]> => api.get(`${url}jobstories.json`),
  getOne: (id: number): Promise<Item> => api.get(`${url}item/${id}.json`),
  getUser: (id: number): Promise<User> => api.get(`${url}user/${id}.json`),
};
