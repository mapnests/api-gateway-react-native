import { NativeModules, Platform } from 'react-native';

type ApiGatewayNativeModule = {
  getHeaders(): Promise<Record<string, string>>;
};

const LINKING_ERROR =
  `The package 'api-gateway-react-native' doesn't seem to be linked.\n\n` +
  Platform.select({
    ios: "- Did you run 'pod install'?\n",
    default: '',
  }) +
  '- Did you rebuild the app after installing the package?\n';

const NativeApiGatwayReactNativeSdk: ApiGatewayNativeModule =
  NativeModules.ApiGatwayReactNativeSdk ??
  new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export default NativeApiGatwayReactNativeSdk;
