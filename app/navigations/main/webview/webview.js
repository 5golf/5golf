import { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Linking, Platform, BackHandler } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RnWebview from 'react-native-webview';
import SendIntentAndroid from 'react-native-send-intent';
import { WEBVIEW_URL } from '../../../constants';

export default function WebView(props) {
  const { route, navigation } = props;
  const { routeUrl } = route.params ?? {};

  const source = { uri: routeUrl ? routeUrl : WEBVIEW_URL };
  const userAgent =
    'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11';

  const webviewRef = useRef(null);
  const [navState, setNavState] = useState(null);

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

  const handleGoBack = (isCanGoBack) => {
    if (isCanGoBack) {
      webviewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const isCanGoBack = navState?.canGoBack;
    navigation.setOptions({
      headerShown: isCanGoBack,
      headerLeft: () => {
        return isCanGoBack ? (
          <MaterialCommunityIcons name={'arrow-left'} size={30} onPress={() => handleGoBack(isCanGoBack)} />
        ) : null;
      },
    });

    BackHandler.addEventListener('hardwareBackPress', handleGoBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    };
  }, [navState?.canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <RnWebview
        ref={webviewRef}
        source={source}
        userAgent={userAgent}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleDetectChangeUrl}
        onNavigationStateChange={(e) => {
          setNavState(e);
        }}
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
