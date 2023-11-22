import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function PushNotification() {
  const handlePushTokenRequest = () => {
    Notifications.requestPermissionsAsync()
      .then(({ status }) => {
        if (status !== 'granted') {
          alert('Permission pour recevoir des notifications refusée');
          return;
        }
        return Notifications.getExpoPushTokenAsync();
      })
      .then((token) => {
        const deviceModel = Device.modelName;
        console.log('Modèle de l\'appareil :', deviceModel);
        console.log('Jeton de push :', token);
        alert(`Modèle de l'appareil : ${deviceModel}\nJeton de push : ${token}`);
      })
      .catch((error) => console.error('Erreur lors de l\'obtention du jeton de push :', error));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Push Notifications avec Device Info</Text>
      <Button title="Obtenir le jeton de push" onPress={handlePushTokenRequest} />
    </View>
  );
}
