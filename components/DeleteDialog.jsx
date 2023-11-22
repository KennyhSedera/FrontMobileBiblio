import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'
import { color } from '../style/color'
import { styles } from '../style/styles'

const Delete = ({
    visible=false,
    btntitle,
    btncolor,
    textcolor,
    title,
    titlecolor=color.black,
    message='message',
    annuler = ()=>{},
    accept = ()=>{},
}) => {
  return (
    visible &&
    <View style={[styles.transparent]}>
        <View style={[{
            backgroundColor:color.white,
            width:'90%',
            minHeight:100,
            borderRadius:10,
            padding:12,
        }]}>
        <Text style={[{
            fontSize:22,
            marginLeft:5,
            color:titlecolor,
        }]}>{title}</Text>
        <View style={{
            marginVertical:10,
            minHeight:20,
            marginBottom:20,
        }}>
            <Text style={[styles.textCenter, {
                fontSize:18,
                color:color.black,
            }]}>{message}</Text>
        </View>
        <View style={{
            flexDirection:'row',
            justifyContent:'space-around',
        }}>
            <View style={{width:'46%'}}>
                <Button onPress={annuler} title='Annuler' color={color.light} rounded={10} />
            </View>
            <View style={{width:'46%'}}>
                <Button onPress={accept} title={btntitle} color={btncolor} textColor={textcolor} rounded={10} />
            </View>
        </View>
      </View>
    </View>
  )
}

export default Delete