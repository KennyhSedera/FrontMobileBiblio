import { Alert, Keyboard, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Input from '../components/Input'
import Button from '../components/Button'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { color } from '../style/color'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        numero: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (errorMsg, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMsg }));
    };
    const login = () => {
        Keyboard.dismiss();
        if (!inputs.numero) {
            handleError('Champ vide !', 'numero')
        } else if(!inputs.password) {
            handleError('Champ vide !', 'password')
        } else {
            axios.post(`${Http}/adherentInsc`, inputs)
                .then((result) => {
                if (result.data.error) {
                    Alert.alert('Alert', result.data.error)
                } else {
                    let array = [];
                    array.push(result.data.data)
                    try {
                        AsyncStorage.setItem('User', JSON.stringify(array))
                        setInputs({
                            numero: '',
                            password: ''
                        })
                        ToastAndroid.show(
                            'Adherent connected !',
                            ToastAndroid.SHORT,
                        );
                        setTimeout(() => {
                            navigation.navigate('homeTab');
                        }, 1000);
                        
                    } catch (error) {
                        console.log(error); 
                    }
                }
            }).catch((err) => {
                console.log({err:err});
            });
        }
    }

    useEffect(() => {
        getUser()
    }, []);
    const getUser = async () => {
    let items = await AsyncStorage.getItem('User')
    user = JSON.parse(items)
        if (user) {
        setTimeout(() => {
            navigation.navigate('homeTab', {user});
        }, 100);
    }
  }
  return (
    <LinearGradient
      colors={['#00fbff85', '#0059ffaf']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
      >
          <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
          }}>
              <View style={{
                  width:'100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
              }}>
                  <Text style={{
                      fontSize: 30,
                      color: '#fff',
                      letterSpacing: -1,
                      fontWeight: 800,
                  }}>Se connecter</Text>
                  <View style={{
                      width: '85%',
                      marginTop:20
                  }}>
                      <Input
                          IconType={Entypo}
                          iconName='user'
                          rounded={5}
                          placeholder='Votre numero ...'
                          error={errors.numero}
                          onFocus={()=>{
                            handleError(null, 'numero')
                          }}
                          onChangeText={(text)=>handleOnChange(text, 'numero')}
                      />
                      <Input 
                          IconType={FontAwesome}
                          iconName='lock'
                          password
                          rounded={5}
                          placeholder='Votre mot de pass ...'
                          error={errors.password}
                          onFocus={()=>{
                            handleError(null, 'password')
                          }}
                          onChangeText={(text)=>handleOnChange(text, 'password')}
                      />
                      <Button
                          color={color.primary}
                          rounded={20}
                          title='Se connecter'
                          textColor={color.white}
                          onPress={login}
                      />
                  </View>
              </View>
        </View>
    </LinearGradient>
  )
}

export default LoginScreen