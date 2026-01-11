# api-gateway-react-native

## Changelog (v1.0.0)
- Initial integration of the API Gateway SDK.

## Installation

```sh
npm install api-gateway-react-native
```
## Usage

```js
import ApiGatway from 'api-gateway-react-native';

const nativeHeaders = await ApiGatway.getHeaders();

```
nativeHeaders retrun neesssary header of your applicaiotion. add your own interfaecotor or http request header or RTK or whatable. 

Example with RTK quaary with Merge headers into request

```javascript

import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ApiGatway from 'api-gateway-react-native';

const baseQueryWithNativeHeaders = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://example.com', //
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
      query: () => '/exampleAPIEndpoint', // GET request
    }),
  }),
});

export const { useGetAuthCasbinTestQuery } = api;


```


## Onboarding Process

1. Send email mentioning all of your package names (com.example.debug, com.example.release etc) and send to `apigw@technonext.com` to get `bind-client-config.json`.
2. Place `bind-client-config.json` in the **root directory** of your project.

## Project Setup Android

### Root `build.gradle.kts`
Add the Mapnests `config-loader` plugin.

Plugin: `com.mapnests.config-loader:com.mapnests.config-loader.gradle.plugin:4.0.0`

``` groovy
buildscript {
    repositories {
        mavenLocal()
        gradlePluginPortal()
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.13.1")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:2.2.21")
        classpath("com.mapnests.config-loader:com.mapnests.config-loader.gradle.plugin:4.0.0")
    }
}
```

### Module build.gradle

Set Java and Kotlin compatibility:

```groovy
plugins {
  // other gradle plugins
  id("com.mapnests.config-loader")
}

compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}
```


## Project Setup IOS

1. Drag and drop the `TNApiGetwaySDK.xcframework` into your project’s **Project Navigator** (e.g., into a `Frameworks` group). 
2. Select your project in Xcode → **Target** → **General** tab.
3. Scroll down to **Frameworks, Libraries, and Embedded Content**.
4. Click the **+** button → Add `TNApiGetwaySDK.xcframework`.
5. Set **Embed** to **Embed & Sign**.

### Root `add TNApiGetwaySDKConfigFile under your  Info.plist`

```xml

<dict>
    <key>TNApiGetwaySDKConfigFile</key>
    <string>bind-client-config.json</string>
</dict>
```

#Add your URLProtocol class to URLSession

```swift

    let config = URLSessionConfiguration.default
    config.protocolClasses = [ClientNetworkProtocol.self] // Inject framework headers
    return URLSession(configuration: config)
```


## Developer Notes
- Keep package names consistent between JSON and Gradle.
- HTTPS is preferred. Only enable HTTP with cleartext traffic if necessary.
- If you receive a 401 error, recheck the app package name and make sure you are using the correct bind-client-config.json file.

## Common Fixes
- 
- Check developers note

---

## Support

For issues or feature requests contact us through email: `apigw@technonext.com`
