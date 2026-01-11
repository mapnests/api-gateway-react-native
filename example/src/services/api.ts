import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ApiGatway from 'api-gateway-react-native';

// Async wrapper to support native headers
const baseQueryWithNativeHeaders = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://192.168.169.231:30702', // <-- Your server base URL
  });

  let nativeHeaders: Record<string, string> = {};

  try {
    nativeHeaders = await ApiGatway.getHeaders();
  } catch (e: any) {
    console.warn('Failed to get native headers:', e.message || e);
  }

  // Merge headers into request
  const queryArgs =
    typeof args === 'string'
      ? { url: args, headers: nativeHeaders }
      : { ...args, headers: { ...args.headers, ...nativeHeaders } };

  return baseQuery(queryArgs, api, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithNativeHeaders,
  endpoints: (builder) => ({
    getAuthCasbinTest: builder.query<any, void>({
      query: () => '/load-test/api/auth-casbin-success-plugin-test', // GET request
    }),
  }),
});

export const { useGetAuthCasbinTestQuery } = api;