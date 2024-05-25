import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

class FirebaseMessage {
  messaging;

  constructor(messagingInstance) {
    this.messaging = messagingInstance;
  }

  checkPermission() {
    // TODO: 권한 체크 필요 없을 경우 삭제
    return this.messaging.hasPermission();
  }

  async requestPermission() {
    if (Platform.OS === 'ios') {
      const result = await this.messaging.requestPermission();
      return result === messaging.AuthorizationStatus.AUTHORIZED;
    } else if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
  }

  async getPushToken() {
    await this.messaging.requestPermission();
    return this.messaging.getToken();
  }

  onForegroundMessage(callback) {
    return this.messaging.onMessage(({ notification, data }) => {
      const { title, body } = notification;
      const result = { title, body };
      if (data.json) result.data = JSON.parse(data.json);
      callback(result);
    });
  }

  onBackgroundMessage(callback) {
    this.messaging.setBackgroundMessageHandler((message) => callback(message));
  }
}

export const firebaseMessage = new FirebaseMessage(messaging());
