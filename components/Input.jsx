import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { styles } from '../style/styles'
import { color } from '../style/color'

const Input = ({
    IconType=Entypo,
    iconName='email',
    password,
    error,
    rounded,
    onFocus = ()=>{},
    ...props
}) => {
    const [hidePwd, setHidePwd] = useState(password)
    const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={{marginBottom:8}}>
        <View style={[styles.row,styles.center, {
            borderWidth:1, 
            height:50,
            paddingHorizontal:10,
            borderColor:error?color.error:isFocused?color.primary:color.trans,
            backgroundColor:color.white,
            borderRadius:rounded,
        }]}>
            {IconType && <IconType name={iconName} size={22} color={error?color.error:isFocused?color.primary:color.grey} />}
            <TextInput
                secureTextEntry={hidePwd}
                onFocus={()=>{
                    onFocus();
                    setIsFocused(true)
                }}
                onBlur={()=>{
                    setIsFocused(false)
                }}
                {...props}
                style={{ flex: 1, fontSize: 16, marginLeft: 10 }} 
            />
            {
                password && <Entypo
                    size={22}
                    name={hidePwd?'eye-with-line':'eye'}
                    onPress={()=>{
                      setHidePwd(!hidePwd)
                    }}
                    color={error?color.error:isFocused?color.primary:color.grey}
                />
            }
        </View>
        <Text style={{color:color.error, fontSize:13, marginLeft:10}}>{error}</Text>
    </View>
  )
}

export default Input