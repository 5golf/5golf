import React from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const WEBVIEW_URL = "https://5golf.co.kr"

export default function App() {
  const source = { uri: WEBVIEW_URL };
  const userAgent =
    "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11";
    const handleOnShouldStartLoadWithRequest = (event) => {
      // TODO: link custom
      return true
    }

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={source} userAgent={userAgent} style={styles.webview} onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
