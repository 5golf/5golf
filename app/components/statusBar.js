import { useEffect } from 'react';
import { Platform, StatusBar as RnStatusBar } from 'react-native';

export default function StatusBar() {
  const isAndroid = Platform.OS === 'android';
  useEffect(() => {
    if (!isAndroid) return;

    RnStatusBar.setBackgroundColor('white');
    RnStatusBar.setBarStyle('dark-content');
  }, []);
  return <RnStatusBar />;
}
