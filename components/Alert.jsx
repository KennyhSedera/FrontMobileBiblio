import { View, Text } from 'react-native'
import React from 'react'
import { style } from '../styles/style'
import { color } from '../styles/colors'
import Button from './Button'

const Alert = ({
    visible=false,
    textcolor,
    title,
    titlecolor=color.black,
    message='message',
    annuler = ()=>{},
}) => {
  return (
    visible &&
    <View style={[style.transparent]}>
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
            <Text style={[style.textCenter, {
                fontSize:18,
                color:color.black,
            }]}>{message}</Text>
        </View>
        <View style={{
            flexDirection:'row',
            justifyContent:'space-around',
        }}>
        <View style={{ width: '60%' }}>
            <Button
                onPress={annuler}
                title='Ok'
                rounded={10}
                color={color.primary}
                textColor={color.white}
            />
        </View>
        </View>
      </View>
    </View>
  )
}

export default Alert