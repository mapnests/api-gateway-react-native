package com.apigatwayreactnativesdk

import com.facebook.react.bridge.*
import com.technonext.network.ApiGatewayHeaderProvider

class ApiGatwayReactNativeSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        init {
            System.loadLibrary("TNApiGatewaySDK")
        }
    }

    override fun getName(): String {
        return "ApiGatwayReactNativeSdk"
    }

    @ReactMethod
    fun getHeaders(promise: Promise) {
        try {
            val headerProvider = ApiGatewayHeaderProvider(reactApplicationContext)
            val headers = headerProvider.headers
            val writableMap = Arguments.createMap()
            for ((key, value) in headers) {
                writableMap.putString(key, value)
            }
            promise.resolve(writableMap)
        } catch (e: Exception) {
            promise.reject("ERR_UNEXPECTED_EXCEPTION", e.message, e)
        }
    }
}
