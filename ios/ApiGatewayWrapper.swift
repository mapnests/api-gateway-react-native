//
//  ApiGatewayWrapper.swift
//  api-gatway-react-native-sdk
//
//  Swift wrapper to bridge TNApiGetwaySDK framework to Objective-C
//

import Foundation
import TNApiGetwaySDK

@objc(ApiGatewayWrapper)
public class ApiGatewayWrapper: NSObject {

    @objc public static let shared = ApiGatewayWrapper()

    private override init() {
        super.init()
    }

    @objc public func getHeaders() -> [String: String] {
        // Use the ApiGatewayHeaderProvider from the framework
        let headerProvider = ApiGatewayHeaderProvider.shared
        let headers = headerProvider.getHeaders()
        return headers
    }
}
