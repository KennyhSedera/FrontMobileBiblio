import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { style } from '../styles/style'
import { color } from '../styles/colors'

const Loader = ({visible=false}) => {
  return (
    visible &&
    <View style={[style.transparent]}>
        <View style={[style.row, {
            height:60, 
            width:'80%', 
            backgroundColor:'#ffffffe0',
            borderRadius:10,
            alignItems:'center',
            alignContent:'center',
            paddingHorizontal:20,
        }]}>
            <ActivityIndicator size='large' color={color.primary} />
            <Text style={{
                fontSize:15,
                fontWeight:500,
                marginLeft:10,
            }}>Chargement ...</Text>
        </View>
    </View>
  )
}

export default Loader