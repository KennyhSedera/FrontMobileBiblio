import { styles } from '../style/styles';
import { color } from '../style/color';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfilScreen from '../screens/ProfilScreen';
import BookScreen from '../screens/BookScreen';
import BookOnScreen from '../screens/BookOnScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const StackNavigatorBook = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="book" component={BookScreen} />
      <Stack.Screen name="bookOne" component={BookOnScreen} />
    </Stack.Navigator>
  );
};

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="search" component={SearchScreen} options={{ tabBarVisible: false }} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabel: false,
        tabBarStyle:{
          position: 'absolute',
          bottom: 10,
          right: 35,
          left: 35,
          height: 65,
          borderRadius: 15,
          elevation: 0,
          ...styles.box
        },
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Ionicons name={focused?'home':'home-outline'} size={25} color={focused?color.primary:'grey'}/>
            <Text style={{ color: focused ?color.primary:'grey'}}>Accueil</Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Book" component={BookScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.box, {
            alignItems: 'center',
            justifyContent: 'center',
            top: -35,
            backgroundColor: focused ? color.primary:'#fff',
            width:80,
            height: 80,
            borderRadius:50,
          }]}>
            <FontAwesome name='book' size={45} color={focused?'white':'grey'}/>
          </View>
        )
      }} />
      <Tab.Screen name="notification" component={NotificationScreen}  options={{
        tabBarIcon: ({ focused }) => (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FontAwesome name={focused?'bell':'bell-o'} size={25} color={focused?color.primary:'grey'}/>
            <Text style={{ color: focused ?color.primary:'grey'}}>Notification</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;