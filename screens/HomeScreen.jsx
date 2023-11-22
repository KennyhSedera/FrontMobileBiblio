import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { styles } from '../style/styles';
import Http from '../Http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([])
  const [emprunt, setEmprunt] = useState([])
  const [user, setUser] = useState('')
  const [id, setId] = useState(null)
  const [pdp, setPdp] = useState('')
  useEffect(() => {
    getUser()
    axios.get(`${Http}/topTen`)
    .then((result) => {
      setData(result.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  const getUser = async () => {
    let items = await AsyncStorage.getItem('User')
    items = JSON.parse(items)
    setPdp(items[0].adherent.photo_Adh);
    setUser(items[0].adherent);
    setId(items[0].id_InscAdh);
    setTimeout(() => {
      getEmpruntCur(items[0].id_InscAdh)
    }, 100);
    
  }
  const getEmpruntCur = async (id_InscAdh) => {
    axios.get(`${Http}/empruntAdhCurr/${id_InscAdh}`)
    .then((result) => {
      setEmprunt(result.data.emprunts);
    }).catch((err) => {
      console.log(err);
    });
  }
  const BookView = ({ data }) => {
    return (
      <View
        style={{
          width: 150,
          height: '98%',
          marginHorizontal: 5,
        }}
      >
        <LinearGradient
          colors={['transparent', '#00000020']}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            width: '100%',
            height: '100%',
            marginHorizontal: 5,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            position: 'absolute',
            zIndex: 2,
            left: -5, 
            top:0,
          }}
        ></LinearGradient>
        <Image
          source={{ uri: `${Http}${data.livre.photo_livre}` }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
    )
  }
  const HeaderHome = () => {
    return (
      <View style={{
        width: '100%',
        height: 65,
        backgroundColor: '#ffffffcf',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom:2,
      }}>
        <Text style={{
          fontStyle: 'italic',
          fontSize: 25,
          fontWeight:300
        }}>AF Fianarantsoa</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap:5
        }}>
          <TouchableOpacity style={[styles.box, {
            width:50,
            height:50,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:50,
            backgroundColor:'white',
          }]} onPress={() => navigation.navigate('Search')}>
            <Entypo name='magnifying-glass' size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box, {
            width:50,
            height:50,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:50,
            backgroundColor:'white',
            marginLeft: 5,
          }]} onPress={() => navigation.navigate('Menu', {user:user, id:id})}>
            <Entypo name='menu' size={28} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const CardEmprunt = ({ data }) => {
    return (
      <Pressable style={{
        height: 120,
        marginHorizontal: 8,
        marginVertical: 5,
        backgroundColor: '#ffffffa0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 3,
        padding: 8,
        borderRadius: 10,
        position:'relative'
      }}>
        <Image
          source={{uri:Http+data.livre.photo_Livre}}
          style={{
            width: '28%',
            height: '98%',
            resizeMode: 'contain',
            objectFit:'cover',
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <View style={{height:'100%',}}>
          <Text><Text style={{fontWeight:700}}>Titre: </Text>{data.livre.titre_livre}</Text>
          <Text><Text style={{fontWeight:700}}>Auteur: </Text>{data.livre.auteur_livre}</Text>
          <Text><Text style={{fontWeight:700}}>Date retour: </Text>{moment(data.retour_Emprunt).format('DD/MM/YYYY')}</Text>
        </View>
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
      <HeaderHome />
      <View style={{
        height: '92%',
        position: 'relative',
        width: '100%',
        
      }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          decelerationRate={0.8}
        >
          
          <View style={{
            width: '100%',
            height:200
          }}>
            <Text>10 meilleurs livres</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0.8}
              width='100%'
            >
              {data.map((item) => <BookView data={item} key={item.id_livre} />)}
            </ScrollView>
          </View>
          <View>
            <Text>Votre emprunt en cours ...</Text>
            { emprunt.map(item=><CardEmprunt data={item} key={item.id_Emprunt} />) }
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;