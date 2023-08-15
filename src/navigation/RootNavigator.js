import React, {useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './../screens/AuthContext';
import AppNavigator from './AppNavigator';


const RootNavigator = () => {
  const { state: { user } } = useContext(AuthContext);


  return (
    <NavigationContainer>
       
          <AppNavigator />
       
    </NavigationContainer>
  );
};

export default RootNavigator;
