#import "ApiGatwayReactNativeSdk.h"

// Forward declare the Swift class
// The actual implementation is in ApiGatewayWrapper.swift
@interface ApiGatewayWrapper : NSObject
+ (ApiGatewayWrapper * _Nonnull)shared;
- (NSDictionary<NSString *, NSString *> * _Nonnull)getHeaders;
@end

@implementation ApiGatwayReactNativeSdk

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(getHeaders,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Use our Swift wrapper to access the framework
        ApiGatewayWrapper *wrapper = [ApiGatewayWrapper shared];
        NSDictionary<NSString *, NSString *> *headers = [wrapper getHeaders];
        resolve(headers);
    } @catch (NSException *exception) {
        reject(@"ERR_UNEXPECTED_EXCEPTION", exception.reason, nil);
    }
}

@end

