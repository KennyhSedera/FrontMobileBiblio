import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Http from '../Http'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { styles } from '../style/styles'
import { color } from '../style/color'
import Button from '../components/Button'

const MenuScreen = ({navigation}) => {
  const [user, setUser] = useState('')
  const [id, setId] = useState(null)
  const [pdp, setPdp] = useState('')
  const list = [
    {title:'Livre', IconName:FontAwesome, icon:'book', route:'Book'},
    {title:'Notification', IconName:FontAwesome, icon:'bell-o', route:'notification'},
    {title:'Réservation', IconName:FontAwesome, icon:'book', route:'reservation'},
    {title:'Recherche', IconName:Entypo, icon:'magnifying-glass', route:'Search'},
  ]

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
  const ProfilView = () => {
    return (
      <Pressable style={{
        marginTop: 5,
        padding: 5,
        backgroundColor: color.light,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
      }} onPress={() => navigation.navigate('Profil', {user:user, id:id})}>
        <Image
          source={{uri:Http+pdp}}
          style={{
            width:80,
            height:80,
            borderRadius:50,
            objectFit:'cover',
            resizeMode:'contain'
          }}
        />
        <View style={{height:'80%'}}>
          <Text style={{letterSpacing:-1, fontSize:22, fontWeight:600}}>{user.prenom_Adh}</Text>
          <Text style={{letterSpacing:-1, fontSize:16, fontWeight:300, marginTop:10}}>Votre profil</Text>
        </View>
      </Pressable>
    )
  }
  
  const HeaderView = ()=>{
    return (
      <View style={{
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
        <Text style={{ color: 'black', fontSize: 28, fontWeight: 800 }}>Menu </Text>
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
      </View>
    )
  }

  const Card = () => {
    return (
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10
      }}>
        {list.map((item, i)=>(
          <Pressable style={{
            backgroundColor: color.light,
            width: '49%',
            height: 100,
            marginTop: 10,
            borderRadius: 15,
            padding: 10,
            display: 'flex',
            flexDirection:'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap:10
          }} key={i} onPress={()=>navigation.navigate(item.route)}>
            <item.IconName name={item.icon} size={40} />
            <Text style={{fontSize:20, fontWeight:600}}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    )
  }
  return (
    <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <HeaderView />
      <ProfilView />
      <Card />
      <View style={[ {
        width: '100%',
        paddingHorizontal: 10,
        marginTop:20
      }]}>
        <Button
          title={'Se Deconnecter'}
          color={color.primary}
          textColor={color.white}
          width={'100%'}

        />
      </View>
    </LinearGradient>
  )
}

export default MenuScreen