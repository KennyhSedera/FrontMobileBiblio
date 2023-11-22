import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../style/styles'

const Button = ({
    title,
    color,
    textColor,
    rounded,
    width,
    onPress = ()=>{}
}) => {
  return (
    <View>
        <TouchableOpacity
            onPress={onPress}
            style={[styles.row, styles.center, styles.boxWhite, {
                backgroundColor:color,
                height:45,
                borderRadius: rounded,
                marginBottom: 10,
                width:width,
            }
        ]}>
              <Text style={{
                color:textColor,
                fontSize:20,
                fontWeight: 600,
            }}>{title}</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default Button