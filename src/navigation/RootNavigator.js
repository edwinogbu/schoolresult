import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './../screens/AuthContext';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const { state } = useContext(AuthContext); // Destructure the context value

  return (
    <NavigationContainer>
      {state.user ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;


// import React, {useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthContext } from './../screens/AuthContext';
// import AppNavigator from './AppNavigator';
// import AuthNavigator from './AuthNavigator';


// const RootNavigator = () => {
//   const { state: { user } } = useContext(AuthContext);


//   return (
//     <NavigationContainer>
//         {state.user ? (
        
//         <AppNavigator />
//         ) : (
//           <AuthNavigator />
//         )}
//   </NavigationContainer>
//     // <NavigationContainer>
       
       
//     // </NavigationContainer>
//   );
// };

// export default RootNavigator;
