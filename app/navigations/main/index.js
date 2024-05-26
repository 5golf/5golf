import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HOME_URL, MYPAGE_URL, CART_URL, BOOKING_URL } from '../../constants';
import WebView from './Webview';

export default function Main() {
  const BottomTab = createBottomTabNavigator();
  const bottomTabList = ['Mypage', 'Home', 'Cart', 'Booking'];
  const getTabParams = (tabName) => {
    // TODO: tab name에 맞게 icon 지정
    switch (tabName) {
      case 'Mypage':
        return { icon: 'account', routeUrl: MYPAGE_URL };
      case 'Cart':
        return { icon: 'cart', routeUrl: CART_URL };
      case 'Booking':
        return { icon: 'book', routeUrl: BOOKING_URL };
      default:
        return { icon: 'home', routeUrl: HOME_URL };
    }
  };

  return (
    <BottomTab.Navigator backBehavior="history" screenOptions={{ title: '', tabBarShowLabel: false }}>
      {bottomTabList.map((tabName) => (
        <BottomTab.Screen
          key={tabName}
          name={tabName}
          component={WebView}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              const { icon } = getTabParams(tabName);
              return <MaterialCommunityIcons name={icon} size={30} />;
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              // TODO: tab에 맞게 routeUrl 지정
              const { routeUrl } = getTabParams(tabName);
              navigation.setParams({ routeUrl });
            },
          })}
        />
      ))}
    </BottomTab.Navigator>
  );
}
