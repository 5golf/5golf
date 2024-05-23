import * as admin from 'firebase-admin'
admin.initializeApp()

const FcmTopic = {
  User: 'user'
} as const

const IS_DEV = process.env.GCLOUD_PROJECT !== 'haseyo-fda77'
const DevAdminUIDs = ['hYAZ3OH5NYgRQBhsG6zLeuB8DNM2', 'nwrjjvGuWMfY8kPqM8RlavQW9M52', 'YTSJoeMMGCb5EBfhztFVLNNLZKP2']
const ProdAdminUIDs = ['eif9DnXk1ohiqFGHASmaTdFXtFz1', '9sa4ARQv3Va2Cm8LYDYOoGXULvA3']
const AdminUIDs = IS_DEV ? DevAdminUIDs : ProdAdminUIDs

const auth = admin.auth()
const firestore = admin.firestore()
const fcm = {
  sendTopic: (topic, notification) =>
    admin.messaging().send({ topic, notification })
  subscribeToTopic: (token, topic) => {
    admin.messaging().subscribeToTopic(token, topic);
  }
    
  unsubscribeFromTopic: (token, topic) =>
    admin.messaging().unsubscribeFromTopic(token, topic)
}


export { auth, firestore, fcm, httpRequest, FcmTopic, AdminUIDs }
