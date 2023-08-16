
import React, { useState, useContext } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; // Removed Ionicons import
import { colors } from './Colors';
import { AuthContext } from './../screens/AuthContext'; // Update the import

const DrawerContent = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state, signOut } = useContext(AuthContext); // Add this line to get the signOut function from context


  const handleSignOut = () => {
    signOut(); // Call the signOut function from context
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // const handleSignOut = () => {
  //   // Simulate sign out action
  //   alert("Your trying to Log Out.. Sorry! work in progress ")
  //   // console.log('User signed out');
  // };

  // Dummy user data
  // const dummyUser = {
  //   name: "Edwin Agbo",
  //   email: "eddy@gmail.com",
  //   phone: "081-4566-7890",
  // };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? colors.dark : colors.white,
        color: isDarkMode ? colors.white : colors.grey1,
      }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            backgroundColor: isDarkMode ? colors.dark : colors.primary,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isDarkMode ? colors.dark : colors.primary,
              paddingLeft: 20,
              paddingVertical: 10,
            }}>
            <Avatar
              rounded
              avatarStyle={{
                ...styles.avatar,
                borderColor: colors.white,
              }}
              size={75}
              source={require('../../assets/icon.png')}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: isDarkMode || colors.dark ? colors.primary : colors.cardbackground,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {state.user ? `Hello ${state.user.name}` : 'Guest'}
              </Text>
              {state.user && (
                <Text
                style={{
                  ...styles.text,
                  color: isDarkMode || colors.dark ? colors.primary : colors.cardbackground,
                  fontSize: 9,
                }}>
                {state.user.email || state.email }
              </Text>
              )}
             {state.user && (
              <Text
                style={{
                  ...styles.text,
                  color: isDarkMode || colors.dark ? colors.primary : colors.cardbackground,
                  fontSize: 9,
                }}>
                {state.user.phone}
              </Text>
             )}
             
            </View>
          </View>

          {/* News/Event */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingBottom: 5,
            }}>
            <View style={{ flexDirection: 'row', marginLeft: 0 }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: colors.cardbackground,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                    <FontAwesome5
                      type="material-community"
                      name="newspaper"
                      size={35}
                      color={isDarkMode || colors.dark ?colors.primary: colors.cardbackground}
                      onPress={() => {
                        props.navigation.navigate('News');
                      }
                      }
                    />
                </Text>
                <Text
                  style={{
                    color: isDarkMode || colors.dark ?colors.primary: colors.cardbackground,
                    fontSize: 14,
                  }}>
                   News/Event
                </Text>
              </View>
            </View>

            {/* Profile */}
            <View style={{ flexDirection: 'row', marginLeft: 0 }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: colors.cardbackground,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  <FontAwesome5
                    type="material-community"
                    name="user"
                    size={35}
                    color={isDarkMode || colors.dark ?colors.primary: colors.cardbackground}
                    onPress={() => {
                      props.navigation.navigate('Profile');
                    }}
                  />
                </Text>
                <Text
                  style={{
                    color: isDarkMode ||  colors.dark ? colors.primary: colors.cardbackground,
                    fontSize: 14,
                    }}>Profile</Text>
              </View>
            </View>
          </View>

          {/* Other content components */}
          {/* ... (other content components) */}
        </View>

        {/* Drawer items and sign-out */}
        <View style={{ marginTop: 10 }}>
          {/* Switch theme */}
          <DrawerItemList {...props} />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="theme-light-dark" color={color} size={size} />
            )}
            label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onPress={toggleDarkMode}
            labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
            switch={
              <Switch
                trackColor={{ false: colors.light, true: colors.grey }}
                thumbColor={isDarkMode ? colors.grey : colors.white}
                ios_backgroundColor={colors.light}
                value={isDarkMode}
                onValueChange={toggleDarkMode}
              />
            }
          />

          {/* Sign out */}
          <DrawerItem
            icon={({ color, size }) => (
              <FontAwesome5 name="sign-out-alt" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={handleSignOut}
            labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
      flex:1
  },
  avatar:{
      borderWidth:4,
      borderColor:colors.pagebackground,
     
  },

  preferences:{
     fontSize:14,
     color:colors.grey2,
     paddingTop:10,
      paddingLeft:20,
      
  },

  switchText:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      paddingLeft:20,
      paddingVertical:5,
      paddingRight:10
  },
  darkthemeText:{
      fontSize:14,
      color:colors.grey,
      paddingTop:10,
       paddingLeft:20,
       fontWeight:'bold'
  },
  text:{
    color:'#fff'
  }
})

export default DrawerContent;




// import React, { useState, useContext } from 'react';
// import { View, Switch, StyleSheet } from 'react-native';
// import { Avatar, Text } from 'react-native-elements';
// import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; // Removed Ionicons import
// import { colors } from './Colors';
// import { AuthContext } from './../screens/AuthContext'; // Update the import

// const DrawerContent = (props) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const { signOut } = useContext(AuthContext); // Add this line to get the signOut function from context


//   const handleSignOut = () => {
//     signOut(); // Call the signOut function from context
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   // const handleSignOut = () => {
//   //   // Simulate sign out action
//   //   alert("Your trying to Log Out.. Sorry! work in progress ")
//   //   // console.log('User signed out');
//   // };

//   // Dummy user data
//   const dummyUser = {
//     name: "Edwin Agbo",
//     email: "eddy@gmail.com",
//     phone: "081-4566-7890",
//   };

//   return (
//     <View
//       style={{
//         ...styles.container,
//         backgroundColor: isDarkMode ? colors.dark : colors.white,
//         color: isDarkMode ? colors.white : colors.grey1,
//       }}>
//       <DrawerContentScrollView {...props}>
//         <View
//           style={{
//             backgroundColor: isDarkMode ? colors.dark : colors.primary,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               backgroundColor: isDarkMode ? colors.dark : colors.primary,
//               paddingLeft: 20,
//               paddingVertical: 10,
//             }}>
//             <Avatar
//               rounded
//               avatarStyle={{
//                 ...styles.avatar,
//                 borderColor: colors.white,
//               }}
//               size={75}
//               source={require('../../assets/icon.png')}
//             />
//             <View style={{ marginLeft: 10 }}>
//               <Text
//                 style={{
//                   color: isDarkMode || colors.dark ? colors.primary : colors.cardbackground,
//                   fontSize: 14,
//                   fontWeight: 'bold',
//                 }}>
//                 Mr {dummyUser.name}
//               </Text>
//               <Text
//                 style={{
//                   ...styles.text,
//                   color: isDarkMode || colors.dark ? colors.primary : colors.cardbackground,
//                   fontSize: 9,
//                 }}>
//                 {dummyUser.email}
//               </Text>
//               <Text
//                 style={{
//                   ...styles.text,
//                   color: isDarkMode || colors.dark ? colors.primary : colors.cardbackground,
//                   fontSize: 9,
//                 }}>
//                 {dummyUser.phone}
//               </Text>
//             </View>
//           </View>

//           {/* News/Event */}
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-evenly',
//               paddingBottom: 5,
//             }}>
//             <View style={{ flexDirection: 'row', marginLeft: 0 }}>
//               <View
//                 style={{
//                   marginLeft: 10,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     color: colors.cardbackground,
//                     fontSize: 18,
//                     fontWeight: 'bold',
//                   }}>
//                     <FontAwesome5
//                       type="material-community"
//                       name="newspaper"
//                       size={35}
//                       color={isDarkMode || colors.dark ?colors.primary: colors.cardbackground}
//                       onPress={() => {
//                         props.navigation.navigate('News');
//                       }
//                       }
//                     />
//                 </Text>
//                 <Text
//                   style={{
//                     color: isDarkMode || colors.dark ?colors.primary: colors.cardbackground,
//                     fontSize: 14,
//                   }}>
//                    News/Event
//                 </Text>
//               </View>
//             </View>

//             {/* Profile */}
//             <View style={{ flexDirection: 'row', marginLeft: 0 }}>
//               <View
//                 style={{
//                   marginLeft: 10,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     color: colors.cardbackground,
//                     fontSize: 18,
//                     fontWeight: 'bold',
//                   }}>
//                   <FontAwesome5
//                     type="material-community"
//                     name="user"
//                     size={35}
//                     color={isDarkMode || colors.dark ?colors.primary: colors.cardbackground}
//                     onPress={() => {
//                       props.navigation.navigate('Profile');
//                     }}
//                   />
//                 </Text>
//                 <Text
//                   style={{
//                     color: isDarkMode ||  colors.dark ? colors.primary: colors.cardbackground,
//                     fontSize: 14,
//                     }}>Profile</Text>
//               </View>
//             </View>
//           </View>

//           {/* Other content components */}
//           {/* ... (other content components) */}
//         </View>

//         {/* Drawer items and sign-out */}
//         <View style={{ marginTop: 10 }}>
//           {/* Switch theme */}
//           <DrawerItemList {...props} />
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons name="theme-light-dark" color={color} size={size} />
//             )}
//             label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//             onPress={toggleDarkMode}
//             labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
//             switch={
//               <Switch
//                 trackColor={{ false: colors.light, true: colors.grey }}
//                 thumbColor={isDarkMode ? colors.grey : colors.white}
//                 ios_backgroundColor={colors.light}
//                 value={isDarkMode}
//                 onValueChange={toggleDarkMode}
//               />
//             }
//           />

//           {/* Sign out */}
//           <DrawerItem
//             icon={({ color, size }) => (
//               <FontAwesome5 name="sign-out-alt" color={color} size={size} />
//             )}
//             label="Sign Out"
//             onPress={handleSignOut}
//             labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
//           />
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container:{
//       flex:1
//   },
//   avatar:{
//       borderWidth:4,
//       borderColor:colors.pagebackground,
     
//   },

//   preferences:{
//      fontSize:14,
//      color:colors.grey2,
//      paddingTop:10,
//       paddingLeft:20,
      
//   },

//   switchText:{
//       flexDirection:"row",
//       alignItems:"center",
//       justifyContent:"space-between",
//       paddingLeft:20,
//       paddingVertical:5,
//       paddingRight:10
//   },
//   darkthemeText:{
//       fontSize:14,
//       color:colors.grey,
//       paddingTop:10,
//        paddingLeft:20,
//        fontWeight:'bold'
//   },
//   text:{
//     color:'#fff'
//   }
// })

// export default DrawerContent;

