import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../style/styles';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');
  const [id, setId] = useState(null);
  const [pdp, setPdp] = useState('');

  useEffect(() => {
    getUser()
  }, [])
  
  const getUser = async () => {
    let items = await AsyncStorage.getItem('User')
    items = JSON.parse(items)
    setPdp(items[0].adherent.photo_Adh);
    setUser(items[0].adherent);
    setId(items[0].id_InscAdh);
    
  }
  const CardNotification = ({ data }) => {
    return (
      <Pressable>

      </Pressable>
    )
  }
  const HeaderView = ()=>{
    return (<View style={{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 75,
        backgroundColor: '#ffffffdf',
        paddingHorizontal:10,
      }}>
          <TouchableOpacity style={[styles.box, {
            width: 45,
            height: 45,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius:10
          }]} onPress={()=> navigation.goBack()}>
            <Entypo name='chevron-left' size={25} />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontSize: 28, fontWeight: 800 }}>Notification </Text>
          <TouchableOpacity style={[styles.box, {
            width:50,
            height:50,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:50,
            backgroundColor:'white',
            marginLeft: 5,
          }]} onPress={() => navigation.navigate('Profil', {user:user, id:id})}>
            <Image
              source={{uri:Http+pdp}}
              style={{
                borderRadius: 50,
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                objectFit: 'cover',
              }}
            />
          </TouchableOpacity>
    </View>)
  }
  return (
    <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <HeaderView />
      <ScrollView>
        {data.map((item)=><CardNotification data={item} key={id} />)}
      </ScrollView>
    </LinearGradient>
  )
}

export default NotificationScreen