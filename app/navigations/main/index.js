import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HOME_URL, MYPAGE_URL, CART_URL, BOOKING_URL, YOUTUBE_URL } from '../../constants';
import Webview from './webview';

export default function Main() {
  const BottomTab = createBottomTabNavigator();
  const bottomTabList = ['Mypage', 'Home', 'Cart', 'Booking', 'Youtube'];
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

  return (
    <BottomTab.Navigator backBehavior="history" screenOptions={{ title: '', tabBarShowLabel: false }}>
      {bottomTabList.map((tabName) => (
        <BottomTab.Screen
          key={tabName}
          name={tabName}
          component={Webview}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              const { icon: _icon } = getTabParams(tabName);
              const icon = focused ? _icon : `${_icon}-outline`;
              return <MaterialCommunityIcons name={icon} size={30} />;
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              const { routeUrl } = getTabParams(tabName);
              navigation.setParams({ routeUrl });
            },
          })}
        />
      ))}
    </BottomTab.Navigator>
  );
}
