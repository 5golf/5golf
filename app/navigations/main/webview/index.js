import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Webview from './webview';

export default function WebviewConatiner(props) {
  const { webviewKey, routeUrl, onChange } = props;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: '' }}
        name="Webview"
        children={() => <Webview webviewKey={webviewKey} routeUrl={routeUrl} onChange={onChange} />}
      />
    </Stack.Navigator>
  );
}
