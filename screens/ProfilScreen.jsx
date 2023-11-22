import { View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRoute } from '@react-navigation/native';
import Http from '../Http';
import { color } from '../style/color';
import axios from 'axios';
import moment from 'moment/moment';
import { styles } from '../style/styles';
import Button from '../components/Button';
import DeleteDialog from '../components/DeleteDialog';

const ProfilScreen = ({ navigation }) => {
  const [emprunts, setEmprunts] = useState([])
  const route = useRoute();
  const { params } = route;
  const { user, id } = params;
  useEffect(() => {
    getEmpruntDB()
  }, [])
  const getEmpruntDB = () => {
    axios.get(`${Http}/empruntAdh/${id}`)
    .then((result) => {
      setEmprunts(result.data.emprunts);
    }).catch((err) => {
      console.log(err);
    });
  }
  const CardEmprunt = ({data}) => {
    return (
      <Pressable style={[styles.box, {
        marginVertical: 4,
        minHeight: 200,
      }]}>
        <LinearGradient
          colors={['#00fbff85', '#fff']}
          start={[0, 0]}
          end={[1, 1]}
          style={{
          paddingBottom: 60}}
        >
          <View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 70,
              paddingHorizontal:10
            }}>
              <Image
                source={{ uri: Http + user.photo_Adh }}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  resizeMode: 'contain',
                  borderRadius:50,
                }}
              />
              <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '70%',
                marginLeft:5
              }}>
                <Text style={{letterSpacing:-1, fontWeight:700, fontSize:20,}}>{user.prenom_Adh}</Text>
                <Text style={{letterSpacing:-1, fontWeight:300, fontSize:14,}}>{moment(data.date_Emprunt).format('Do, MMM')}</Text>
              </View>
            </View>
            <View style={{margin:5}}>
              <Text><Text style={{fontWeight:700}}>Titre: </Text>{data.livre.titre_livre}</Text>
              <Text><Text style={{fontWeight:700}}>Auteur: </Text>{data.livre.auteur_livre}</Text>
              <Text><Text style={{fontWeight:700}}>Date retour: </Text>{moment(data.retour_Emprunt).format('DD/MM/YYYY')}</Text>
            </View>
          </View>
          <Image
            source={{ uri: Http + data.livre.photo_Livre }}
            style={{
              width: '100%',
              height: 420,
              resizeMode: 'contain',
              objectFit: 'cover',
            }}
          />
        </LinearGradient>
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
      <ScrollView>
        <View style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center',
        }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              backgroundColor: '#ffffffd0',
              position: 'absolute',
              left: 45,
              top: 2
            }}
          />
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              backgroundColor: '#ffffffd0',
              position: 'absolute',
              right: 45,
              bottom: 0
            }}
          />
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              objectFit: 'cover',
              resizeMode: 'contain',
              marginTop: 10,
              borderWidth: 3,
              borderColor: color.white
            }}
            source={{ uri: Http + user.photo_Adh }}
          />
        </View>
        <View style={{marginBottom:20}}>
          <Text style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 800,
          }}>{user.nom_Adh}</Text>
          <Text style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 400,
          }}>{user.prenom_Adh}</Text>
        </View>
        
        {
          emprunts.map(item=><CardEmprunt data={item} key={item.id_Emprunt} />)
        }
      </ScrollView>
      <DeleteDialog />
    </LinearGradient>
  )
}

export default ProfilScreen