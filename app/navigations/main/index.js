import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HOME_URL, MYPAGE_URL, CART_URL, BOOKING_URL, YOUTUBE_URL } from '../../constants';
import Webview from './webview';

export default function Main(props) {
  const BottomTab = createBottomTabNavigator();
  const navigation = useNavigation();

  const [currentUrl, setCurrentUrl] = useState(HOME_URL);
  const [webviewKey, setWebviewKey] = useState({});

  const bottomTabList = ['Mypage', 'Home', 'Cart', 'Booking', 'Youtube'];
  const bottomTabUrlList = [HOME_URL, MYPAGE_URL, CART_URL, BOOKING_URL, YOUTUBE_URL];

  const getTabParams = (tabName) => {
    // TODO: tab name에 맞게 icon 지정
    switch (tabName) {
      case 'Mypage':
        return { icon: 'account', routeUrl: MYPAGE_URL };
      case 'Cart':
        return { icon: 'cart', routeUrl: CART_URL };
      case 'Booking':
        return { icon: 'book', routeUrl: BOOKING_URL };
      case 'Youtube':
        return { icon: 'heart', routeUrl: YOUTUBE_URL };
      default:
        return { icon: 'home', routeUrl: HOME_URL };
    }
  };

  const handleBottomTabPress = (tabName) => {
    const { routeUrl } = getTabParams(tabName);
    const isDifferentYoutubeUrl = currentUrl !== routeUrl;
    const isSameOriginUrl = currentUrl.includes(routeUrl);
    const isNestedUrl = currentUrl.length > routeUrl.length;

    if (isDifferentYoutubeUrl || (isSameOriginUrl && isNestedUrl)) {
      setWebviewKey({ ...webviewKey, [tabName]: `${tabName}${Date.now()}` });
      setCurrentUrl(routeUrl);
    } else {
      setCurrentUrl(routeUrl);
    }
  };

  return (
    <BottomTab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={{ title: '', tabBarShowLabel: false }}
    >
      {bottomTabList.map((tabName) => {
        return (
          <BottomTab.Screen
            key={tabName}
            name={tabName}
            children={() => {
              const { routeUrl } = getTabParams(tabName);
              return <Webview webviewKey={webviewKey[tabName]} routeUrl={routeUrl} onChange={setCurrentUrl} />;
            }}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                const { icon: _icon } = getTabParams(tabName);
                const icon = focused ? _icon : `${_icon}-outline`;
                return <MaterialCommunityIcons name={icon} size={30} />;
              },
            }}
            listeners={() => ({
              tabPress: () => handleBottomTabPress(tabName),
            })}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
