import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRoute } from '@react-navigation/native'
import Http from '../Http'
import { styles } from '../style/styles'
import { Entypo } from '@expo/vector-icons'
import Button from '../components/Button'
import { color } from '../style/color'
import moment from 'moment/moment'

const BookOnScreen = ({ navigation }) => {
  const route = useRoute();
  const { params } = route;
  const data = params.data;
  const Footer = () => {
    return (
      <View style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 'bold',
          letterSpacing: -2,
          color:color.black,
        }}>{data.titre_livre}</Text>
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            width: '100%',
            display: 'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center'
          }}
        >
          <Button
            title={'Reserver'}
            textColor={'#fff'}
            color={color.primary}
            rounded={50}
            width={260}
          />
        </View>
        <View style={{
          marginTop: 15,
        }}>
          <Details titre={'Auteur: '} value={data.auteur_livre} />
          <Details titre={'Edition: '} value={data.edition_livre} />
          <Details titre={'Date d\'edition: '} value={moment(data.date_edition_livre).format('DD/MM/YYYY')} />
          <Details titre={'Emplacement: '} value={data.emplacement_livre} />
          <Details titre={'Nombre de page: '} value={data.nb_page_livre} />
          <Details titre={'Format: '} value={data.format_livre} />
        </View>
      </View>
    )
  }
  const Details = ({titre, value}) => {
    return (
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems:'center',
      }}>
        <Text style={{
          fontSize:19,
          fontWeight:600,
          letterSpacing:-1
        }}>{ titre }</Text>
        <Text style={{
          fontSize:19,
          fontWeight:300,
          letterSpacing:-1
        }}>{ value }</Text>
      </View>
    )
  }
  return (
    <View
      style={{ flex: 1 }}
    >
      <TouchableOpacity style={[styles.box, {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'absolute',
        zIndex: 1,
        margin: 10,
      }]} onPress={()=> navigation.goBack()}>
        <Entypo name='chevron-left' size={25} />
      </TouchableOpacity>
      <Image
        style={{
          height: '65%',
          width: '100%',
          resizeMode: 'contain',
          objectFit: 'cover',
        }}
        source={{uri: Http+data.photo_livre}}
      />
      <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]} style={{ 
        height: '45%',
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop:10,
      }}>
        <Footer />
      </LinearGradient>
    </View>
  )
}

export default BookOnScreen;