import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Webview from './webview';

export default function WebviewConatiner(props) {
  const { routeUrl } = props.route.params ?? {};
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ title: '' }} name="Webview" component={Webview} initialParams={{ routeUrl }} />
    </Stack.Navigator>
  );
}
