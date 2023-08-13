import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StarterScreen from './../screens/StarterScreen';


const Stack = createNativeStackNavigator();


export default function AuthStack() {

  return (

      <Stack.Navigator initialRouteName='StarterScreen'>
        <Stack.Screen name="StarterScreen" options={{headerShown: false}} component={StarterScreen} />
      </Stack.Navigator>

  )
}