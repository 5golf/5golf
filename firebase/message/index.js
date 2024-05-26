import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

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
    return await this.messaging.getToken();
  }

  onForegroundMessage(callback) {
    return this.messaging.onMessage(({ notification, data }) => {
      const { title, body } = notification;
      const result = { title, body };
      this.showForegroundNotification(result);
      callback(result);
    });
  }

  onBackgroundMessage(callback) {
    this.messaging.setBackgroundMessageHandler(({ notification }) => {
      const { title, body } = notification;
      const result = { title, body };
      this.showForegroundNotification(result);
      callback(result);
      return Promise.resolve(true);
    });
  }

  showForegroundNotification(message) {
    const { title, body } = message;
    PushNotification.createChannel({
      channelId: '5golf',
      channelName: '5golf',
      importance: Importance.HIGH,
    });

    PushNotification.localNotification({
      channelId: '5golf',
      title,
      message: body,
      vibrate: true,
      vibration: 300,
      priority: 'high',
    });
  }
}

export const firebaseMessage = new FirebaseMessage(messaging());
