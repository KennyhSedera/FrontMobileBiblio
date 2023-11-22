import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BookScreen from '../screens/BookScreen';
import ProfilScreen from '../screens/ProfilScreen';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
// import PushNotificationsScreen from '../screens/PushNotificationsScreen';
// import NotificationScreen from '../screens/NotificationScreen';
import { color } from '../style/color';
import { styles } from '../style/styles';
import SearchScreen from '../screens/SearchScreen';
import BookOnScreen from '../screens/BookOnScreen';
import LoginScreen from '../screens/LoginScreen';
import BegginScreen from '../screens/BegginScreen';
import MenuScreen from '../screens/MenuScreen';
import PushNotification from '../screens/PushNotification';

const Navigation = () => {
    const Tab = createBottomTabNavigator();
    const StackHome = () => {
        return (
            <Tab.Navigator screenOptions={{
                headerShown:false,
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom: 0,
                    height: 75,
                    elevation: 0,
                    ...styles.box,
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
                    top: -45,
                    backgroundColor: focused ? color.primary:'#fff',
                    width:90,
                    height: 90,
                    borderRadius:50,
                }]}>
                    <FontAwesome name='book' size={45} color={focused?'white':'grey'}/>
                </View>
                )
            }} />
            <Tab.Screen name="notification" component={PushNotification}  options={{
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
        )
    }
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <StatusBar />
            <Stack.Navigator
                initialRouteName='Beggin'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='homeTab' component={StackHome} />
                <Stack.Screen name='Search' component={SearchScreen} />
                <Stack.Screen name='Profil' component={ProfilScreen} />
                <Stack.Screen name='BookOne' component={BookOnScreen} />
                <Stack.Screen name='Beggin' component={BegginScreen} />
                <Stack.Screen name='Menu' component={MenuScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default Navigation