import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './main';

export default function Navigations() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Main'}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
