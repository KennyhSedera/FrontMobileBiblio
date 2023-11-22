import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text } from 'react-native';

const SettingsScreen = () => {
  return (
    <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Setting</Text>
      </View>
    </LinearGradient>
  );
};

export default SettingsScreen;