import { useRef, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Linking, Platform, BackHandler, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RnWebview from 'react-native-webview';
import SendIntentAndroid from 'react-native-send-intent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '../../../components/loading';

export default function Webview(props) {
  const { webviewKey, routeUrl, onChange } = props;
  const navigation = useNavigation();

  const userAgent =
    'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11';
  const source = { uri: routeUrl };

  const webviewRef = useRef(null);
  const [navState, setNavState] = useState(null);

  const handleShouldStartLoadWithRequest = (event) => {
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

  const handleDetectChangeUrl = (e) => {
    const { url: currentUrl } = e;
    setNavState(e);
    onChange(currentUrl);
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
    const isCanGoBack = navState?.canGoBack ?? false;

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

  useFocusEffect(useCallback(() => navigation.setOptions({ headerShown: false }), []));

  return (
    <SafeAreaView style={styles.container}>
      <RnWebview
        key={webviewKey}
        ref={webviewRef}
        source={source}
        userAgent={userAgent}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onNavigationStateChange={handleDetectChangeUrl}
        startInLoadingState={true}
        renderLoading={Loading}
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
