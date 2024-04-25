import React from "react";
import { SafeAreaView, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const source = { uri: "https://5golf.co.kr" };

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={source} style={styles.webview} />
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
