import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
   'x-bingapis-sdk': 'true',
   'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
   'x-rapidapi-key': process.env.REACT_APP_NEWS_API_KEY,
}

const baseUrl = process.env.REACT_APP_NEWS_API_URL;



const createRequest = (url, body) => ({ url, headers: cryptoNewsHeaders, method: 'POST', body });

export const cryptoNewsApi = createApi({
   reducerPath: 'cryptoNewsApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: (builder) => ({
      getCryptoNews: builder.query({
         query: ({ newsCategory, count }) => {
            const payload = {
               text : newsCategory,
               max_results : count,
               region : 'wt-wt'
            }
            return createRequest(``, payload)
         }
      })
   }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;


