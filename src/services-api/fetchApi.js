import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31598186-1712abd3d6ab8b33b97a57686';
export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: `${API_KEY}`,
      q: `${searchQuery}`,
      page: `${page}`,
      image_type: 'photo',
      orientation: 'horisontal',
      per_page: 12,
    },
  });
  return response.data;
};
