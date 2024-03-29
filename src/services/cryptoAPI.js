import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
   'x-access-token': process.env.REACT_APP_RAPIDAPI_KEY,
}

const baseUrl = process.env.REACT_APP_CRYPTO_RAPIDAPI_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders});

const buildParams = ({params}) => {
   let queryString =  URLSearchParams({
   'x-access-token': process.env.REACT_APP_RAPIDAPI_KEY,
   ...params
   })
   console.log(queryString)
}


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
         query : ({coinID, timePeriod}) => createRequest(`/coin/${coinID}/history/?timePeriod=${timePeriod}`),
      }),
      getExchanges : builder.query({
         query : () => createRequest(`/exchanges`),
      }),
   })
})

export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery} = cryptoApi;