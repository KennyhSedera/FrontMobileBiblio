import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { color } from '../style/color'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BegginScreen = ({navigation}) => {
  useEffect(() => {
    getUser()
  }, []);
  const getUser = async () => {
    let items = await AsyncStorage.getItem('User')
    user = JSON.parse(items)
    if (user) {
      setTimeout(() => {
        navigation.navigate('homeTab');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.navigate('login');
      }, 2000);
    }
  }
  return (
    <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1, justifyContent:'center', alignItems:'center' }}
    >
      <Text style={{color:color.white, fontSize:35, fontWeight:700,}}>Alliance Française</Text>
      <Text style={{color:color.white, fontSize:35, fontWeight:700,}}>Fianarantsoa</Text>
      <ActivityIndicator size={100} color={color.white} />
    </LinearGradient>
  )
}

export default BegginScreen