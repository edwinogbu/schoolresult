import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from './../screens/StarterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Starter"
        options={{ headerShown: false }}
        component={StarterScreen}
      />
      {/* You can add more authentication-related screens here */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;


// import React,{ useContext} from 'react';
// import {  StyleSheet, TouchableOpacity, Image} from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const AuthNavigator = () => (
//     <Stack.Navigator initialRouteName="Starter">
  
//       <Stack.Screen name="Starter"
//            options = {{ 
//                       headerShown:false, 
//               }}
//        component={StarterScreen} />
  
  
//     </Stack.Navigator>
//   );
  

//   export default AuthNavigator;