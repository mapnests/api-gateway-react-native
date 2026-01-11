import NativeApiGatwayReactNativeSdk from './NativeApiGatwayReactNativeSdk';

/**
 * Get API Gateway headers from native SDK
 */
export async function getHeaders(): Promise<Record<string, string>> {
  return NativeApiGatwayReactNativeSdk.getHeaders();
}

// Optional default export
export default {
  getHeaders,
};