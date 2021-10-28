import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
   'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
   'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
}

const baseUrl = process.env.REACT_APP_CRYPTO_RAPIDAPI_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
   reducerPath: 'cryptoApi',
   baseQuery: fetchBaseQuery({baseUrl}),
   endpoints: (builder) => ({
      getCryptos: builder.query({
         query : (count) => createRequest(`/coins?limit=${count}`)
      }),
      getCryptoDetails: builder.query({
         query : (coinID) => createRequest(`/coin/${coinID}`),
      }),
      getCryptoHistory: builder.query({
         query : ({coinID, timePeriod}) => createRequest(`/coin/${coinID}/history/${timePeriod}`),
      })
   })
})

export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;