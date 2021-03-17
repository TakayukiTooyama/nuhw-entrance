import aspida from '@aspida/fetch';
import api from 'api/$api';
import type { FaqListResponse } from 'models/users';

const url = process.env.MICRO_CMS_HOST;
const config = {
  headers: { 'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '' },
};

export const getAllFaq = async (): Promise<FaqListResponse> => {
  const apiClient = api(aspida(fetch, { baseURL: url }));

  // res が CommonList<Post> 型になっている
  return apiClient.faqs.$get({ config });
};
