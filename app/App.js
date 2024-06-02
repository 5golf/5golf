import { useEffect } from 'react';
import { firebaseMessage } from '@5golf/firebase';
import { NavigationContainer } from '@react-navigation/native';
import Navigations from './navigations';
import StatusBar from './components/statusBar';

export default function App() {
  useEffect(() => {
    firebaseMessage.requestPermission();
    firebaseMessage.onForegroundMessage(() => {});
    firebaseMessage.onBackgroundMessage(() => {});
  }, []);

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Navigations />
      </NavigationContainer>
    </>
  );
}
