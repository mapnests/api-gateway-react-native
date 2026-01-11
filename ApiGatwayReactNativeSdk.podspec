require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ApiGatwayReactNativeSdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/technonext/api-gatway-react-native-sdk"
  s.license      = "MIT"
  s.authors      = { "technonext" => "technonext@example.com" }
  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/technonext/api-gatway-react-native-sdk.git", :tag => "#{s.version}" }

  # Include Objective-C/Objective-C++ and Swift files
  s.source_files = "ios/*.{h,m,mm,swift}"
  s.exclude_files = "ios/ApiGatewayModule.{m,swift}", "ios/ApiGatewayReactNativeSdk-Bridging-Header.h", "ios/ApiGatewayModule.m"

  # Vendored XCFramework
  s.vendored_frameworks = "ios/TNApiGetwaySDK.xcframework"

  # Swift version
  s.swift_version = "5.0"

  s.frameworks = "Foundation"
  s.pod_target_xcconfig = {
    'OTHER_LDFLAGS' => '-framework TNApiGetwaySDK',
    'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
    'DEFINES_MODULE' => 'YES'
  }
  s.user_target_xcconfig = {
    'OTHER_LDFLAGS' => '-framework TNApiGetwaySDK'
  }

  s.dependency "React-Core"
end
