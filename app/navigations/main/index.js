import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebviewPage, DEFAULT_PAGE_URL } from '../../constants';
import Webview from './webview';

export default function Main(props) {
  const BottomTab = createBottomTabNavigator();
  const navigation = useNavigation();

  const [currentUrl, setCurrentUrl] = useState(DEFAULT_PAGE_URL);
  const [webviewKey, setWebviewKey] = useState({});

  const handleSetNavigate = (tabName, url) => {
    setWebviewKey({ ...webviewKey, [tabName]: `${tabName}${Date.now()}` });
    setCurrentUrl(url);
  };

  const handleChangePage = (tabName) => {
    const { url } = WebviewPage[tabName];
    const isDifferentUrl = currentUrl !== url;
    const isSameOriginUrl = currentUrl.includes(url);
    const isNestedUrl = currentUrl.length > url.length;

    if (isDifferentUrl || (isSameOriginUrl && isNestedUrl)) {
      handleSetNavigate(tabName, url);
    } else {
      setCurrentUrl(url);
    }
  };

  return (
    <BottomTab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={{ title: '', tabBarShowLabel: false }}
    >
      {Object.entries(WebviewPage).map(([tabName, { url, icon: _icon }]) => {
        return (
          <BottomTab.Screen
            key={tabName}
            name={tabName}
            children={() => {
              return <Webview webviewKey={webviewKey[tabName]} routeUrl={url} onChange={setCurrentUrl} />;
            }}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                const icon = focused ? _icon : `${_icon}-outline`;
                return <MaterialCommunityIcons name={icon} size={30} />;
              },
            }}
            listeners={() => ({
              tabPress: () => handleChangePage(tabName),
            })}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
