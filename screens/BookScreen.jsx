import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '../style/styles'
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
import Http from '../Http'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BookScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([])
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
  useEffect(() => {
    axios.get(`${Http}/livreDispo`)
      .then((result) => {
        setData(result.data.livres);
        setDataSearch(result.data.livres);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSearch = (e) => {
    const value = e;
    const filteredLivres = dataSearch.filter((item) => {
      return value.toLowerCase() === ''
        ? item
        : item.titre_livre.toLowerCase().includes(value.toLowerCase()) ||
          item.auteur_livre.toLowerCase().includes(value.toLowerCase()) ||
          item.notation_livre.toLowerCase().includes(value.toLowerCase()) ||
          item.format_livre.toLowerCase().includes(value.toLowerCase()) ||
          item.emplacement_livre.toLowerCase().includes(value.toLowerCase()) ||
          item.collection_livre.toLowerCase().includes(value.toLowerCase());
    });
    setData(filteredLivres);
  }

  const CardBook = ({ data }) => {
    return (
      <Pressable style={{
        width: '49%',
        height: 200,
        marginTop:10, 
      }} onPress={()=>navigation.navigate('BookOne', {data})}>
        <Image source={{ uri: Http+data.photo_livre }} style={{
          width: '100%',
          height: '100%',
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }} />
      </Pressable>
    )
  }
  return (
    <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <View style={{
        backgroundColor: '#ffffffcf',
        paddingHorizontal: 10
      }}>
        <View style={{
          display: 'flex',
          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 65,
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
          <Text style={{ color: 'black', fontSize: 28, fontWeight: 800 }}>Livres </Text>
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
        <View style={[styles.box, {
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 15,
          paddingRight: 10,
          alignItems: 'center',
          gap: 10,
          backgroundColor: 'white',
          paddingVertical: 8,
          borderRadius: 50,
          marginVertical: 10,
        }]}>
          <TextInput
            style={{
              width: '85%',
              height: 35,
              fontSize: 18,
            }}
            placeholder='Recherche livre(s) ...'
            onChangeText={handleSearch}
          />
          <Entypo name='magnifying-glass' size={23} style={[styles.box, {
            backgroundColor: '#fff',
            padding: 8,
            borderRadius: 50,
          }]} />
        </View>
      </View>
      <ScrollView>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingHorizontal:10,
        }}>
          {data.map((item)=><CardBook data={item} key={item.id_livre} />)}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default BookScreen