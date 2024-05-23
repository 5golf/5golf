import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Linking, Platform } from 'react-native';
import RnWebview from 'react-native-webview';
import SendIntentAndroid from 'react-native-send-intent';
import { WEBVIEW_URL } from '../../constants';

export default function WebView(props) {
  const { route } = props;
  const { params } = route;
  const { routeUrl } = params ?? {};

  const source = { uri: routeUrl ? `${routeUrl}?t=${Date.now()}` : WEBVIEW_URL };
  const userAgent =
    'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11';

  const handleDetectChangeUrl = (event) => {
    const { url } = event;
    if (url.includes('pf.kakao')) {
      if (Platform.OS === 'android') {
        SendIntentAndroid.openAppWithUri(event.url);
      } else if (Platform.OS === 'ios') {
        Linking.openURL(url);
      }
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <RnWebview
        source={source}
        userAgent={userAgent}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleDetectChangeUrl}
      />
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
