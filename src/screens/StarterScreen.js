// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   SafeAreaView,
//   Animated,
// } from 'react-native';

// import { Icon, Header } from 'react-native-elements';
// import { Ionicons, Entypo } from '@expo/vector-icons';
// import { AuthContext } from './AuthContext';
// import { CommonActions, DrawerActions } from '@react-navigation/native';



// const StarterScreen = ({ navigation }) => {
//   const { state, signIn, signUp } = useContext(AuthContext);

//   const [signUpModalVisible, setSignUpModalVisible] = useState(false);
//   const [signInModalVisible, setSignInModalVisible] = useState(false);
//   const [user, setUser] = useState(state);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [phoneError, setPhoneError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const animatedValue = new Animated.Value(0);
 
//   useEffect(() => {
//     Animated.timing(animatedValue, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const startAnimation = () => {
//     Animated.timing(animatedValue, {
//       toValue: 0.8,
//       duration: 150,
//       useNativeDriver: true,
//     }).start();
//   };

//   const backgroundScale = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0.8],
//   });
//   const validateName = () => {
//     if (name.trim() === '') {
//       setNameError('Name is required');
//     } else {
//       setNameError('');
//     }
//   };
  
//   const validateEmail = () => {
//     if (email.trim() === '') {
//       setEmailError('Email is required');
//     } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//       setEmailError('Invalid email address');
//     } else {
//       setEmailError('');
//     }
//   };
  
//   const validatePhone = () => {
//     if (phone.trim() === '') {
//       setPhoneError('Phone is required');
//     } else if (!/^\d{11}$/.test(phone)) {
//       setPhoneError('Invalid phone number');
//     } else {
//       setPhoneError('');
//     }
//   };
  
//   const validatePassword = () => {
//     if (password.trim() === '') {
//       setPasswordError('Password is required');
//     } else if (password.length < 6) {
//       setPasswordError('Password should be at least 6 characters');
//     } else {
//       setPasswordError('');
//     }
//   };


//   const handleSignUp = async () => {
//     validateName();
//     validateEmail();
//     validatePhone();
//     validatePassword();

//     if (nameError === '' && emailError === '' && phoneError === '' && passwordError === '') {
//       try {
//         const user = { name, email, phone, password }; // Create an object with user data
//         await signUp(user); // Dispatch the SIGN_UP action with user data
        
//         setName('');
//         setEmail('');
//         setPhone('');
//         setPassword('');
//         setSignUpModalVisible(false);
//         // Navigate to the 'HomeScreen' within the BottomTabNavigator
//         navigation.dispatch(
//           CommonActions.navigate({
//             name: 'App', // Use the exact name as defined in your navigator
//           })
//           );
//           // console.log(user);
        
//       } catch (error) {
//         console.log('Sign up error:', error);
//       }
//     }
//   };

  
//   const handleSignIn = async () => {
//     validateName();
//     validatePassword();
  
//     if (emailError === '' && passwordError === '') {
//       try {
//         await signIn(email, password);
//         setEmail('');
//         setPassword('');
//         setSignInModalVisible(false);
  
//         // Navigate to the 'HomeScreen' within the BottomTabNavigator
//         navigation.dispatch(
//           CommonActions.navigate({
//             name: 'App', // Use the exact name as defined in your navigator
//           })
//         );
//       } catch (error) {
//         console.log('Sign in error:', error);
//       }
//     }
//   };
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const monthNames = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];
// const month = monthNames[currentDate.getMonth()];
// const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const day = dayNames[currentDate.getDay()];

// const formattedDate = `${month} ${year} ${day}`;

// // console.log(formattedDate);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         centerComponent={
//             <TouchableOpacity onPress={() => navigation.goBack()} style={{ fontWeight: 'bold', fontSize: 22 }}>
//               <Entypo name="graduation-cap" size={40} color="#fff"  style={{ marginLeft:30,  }} />
//               <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>B S U RESULT APP</Text>
//             </TouchableOpacity>
//           }
//           rightComponent={
//             <View style={styles.timerContainer}>
//               <Entypo name="calendar" size={20} color="#fff" />
//               <Text style={{ ...styles.timerText, color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{` ${formattedDate}`}</Text>
//             </View>
//           }
//           containerStyle={{ backgroundColor: '#000080' }} // Set the header background color to navy blue
//         />


//       <ImageBackground
//         source={require('./../../assets/icon.png')}
//         style={styles.backgroundContainer}
//         resizeMode="cover"
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setSignUpModalVisible(true)}
//             activeOpacity={0.7}
//             onPressIn={startAnimation}
//           >
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setSignInModalVisible(true)}
//             activeOpacity={0.7}
//             onPressIn={startAnimation}
//           >
//             <Text style={styles.buttonText}>Sign In</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>


//       {/* Sign Up Modal */}
//       <Modal animationType="slide" transparent={true} visible={signUpModalVisible}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//           <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setSignUpModalVisible(false)}
//               activeOpacity={0.7}
//             >
//               <Ionicons name="close-circle-outline" size={35} color="#00A8F0" />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Sign Up</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               value={name}
//               onChangeText={setName}
//               onBlur={validateName}
//             />
//             {nameError !== '' && <Text style={styles.errorText}>{nameError}</Text>}
//             <TextInput
//               style={styles.input}
//               placeholder="email"
//               value={email}
//               onChangeText={setEmail}
//               onBlur={validateEmail}
//             />
//             {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
//             <TextInput
//               style={styles.input}
//               placeholder="Phone"
//               value={phone}
//               onChangeText={setPhone}
//               onBlur={validatePhone}
//             />
//             {phoneError !== '' && <Text style={styles.errorText}>{phoneError}</Text>}
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               secureTextEntry={true}
//               value={password}
//               onChangeText={setPassword}
//               onBlur={validatePassword}
//             />
//             {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={handleSignUp}
//               // onPress={()=>{navigation.navigate("App")}}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>
           
//           </View>
//         </View>
//       </Modal>

//       {/* Sign In Modal */}
//       <Modal animationType="slide" transparent={true} visible={signInModalVisible}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//           <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setSignInModalVisible(false)}
//               activeOpacity={0.7}
//             >
//               <Ionicons name="close-circle-outline" size={35} color="#00A8F0" />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Sign In</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               onBlur={validateEmail}
//             />
//             {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               secureTextEntry={true}
//               value={password}
//               onChangeText={setPassword}
//               onBlur={validatePassword}
//             />
//             {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={handleSignIn}
//               // onPress={()=>{navigation.navigate("App")}}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>
           
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#0000FF'
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#000080', // Navy Blue color
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 10,
//     fontWeight: '900',
//   },
//   modalButton: {
//     backgroundColor: '#000080', // Navy Blue color
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   closeButton: {
//     alignItems: 'flex-end',
//     marginTop: 10,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   backgroundContainer: {
//     flex: 1,
//     paddingTop: 100,
//     alignItems: 'center',
//   },

//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     marginTop: 'auto',
//     marginBottom: 95,
//   },

//   button: {
//     backgroundColor: '#000080', // Navy Blue color
//     paddingHorizontal: 25,
//     paddingVertical: 15,
//     borderRadius: 100,
//     marginVertical: 12,
//     marginHorizontal: 10,
//     borderColor: '#FFFF00',
//     borderWidth: 5,
//   },
// });

// export default StarterScreen;


import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { AuthContext } from './AuthContext';
import { CommonActions, DrawerActions } from '@react-navigation/native';

import Swiper from 'react-native-swiper/src';



const StarterScreen = ({ navigation }) => {
  const { state, signIn, signUp } = useContext(AuthContext);

  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [user, setUser] = useState(state);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  // const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const animatedValue = new Animated.Value(0);
 
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const backgroundScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };
  
  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  
  const validatePhone = () => {
    if (phone.trim() === '') {
      setPhoneError('Phone is required');
    } else if (!/^\d{11}$/.test(phone)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };
  
  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };


  const handleSignUp = async () => {
    validateName();
    validateEmail();
    validatePhone();
    validatePassword();

    if (nameError === '' && emailError === '' && phoneError === '' && passwordError === '') {
      try {
        const user = { name, email, phone, password }; // Create an object with user data
        await signUp(user); // Dispatch the SIGN_UP action with user data
        
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setSignUpModalVisible(false);
        // Navigate to the 'HomeScreen' within the BottomTabNavigator
        navigation.dispatch(
          CommonActions.navigate({
            name: 'App', // Use the exact name as defined in your navigator
          })
          );
          // console.log(user);
        
      } catch (error) {
        console.log('Sign up error:', error);
      }
    }
  };

  
  const handleSignIn = async () => {
    validateName();
    validatePassword();
  
    if (emailError === '' && passwordError === '') {
      try {
        await signIn(email, password);
        setEmail('');
        setPassword('');
        setSignInModalVisible(false);
  
        // Navigate to the 'HomeScreen' within the BottomTabNavigator
        navigation.dispatch(
          CommonActions.navigate({
            name: 'App', // Use the exact name as defined in your navigator
          })
        );
      } catch (error) {
        console.log('Sign in error:', error);
      }
    }
  };
const currentDate = new Date();
const year = currentDate.getFullYear();
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const month = monthNames[currentDate.getMonth()];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = dayNames[currentDate.getDay()];

const formattedDate = `${month} ${year} ${day}`;

// console.log(formattedDate);

  return (
    <SafeAreaView style={styles.container}>
     <Header
        // leftComponent={
        //     <TouchableOpacity >
        //     <Image source={require('./../../assets/image/BSUM.jpg')} style={styles.slideImage} />
        //     </TouchableOpacity>
        //   }
        centerComponent={
            <TouchableOpacity  style={{ fontWeight: 'bold', fontSize: 22 }}>
              <Entypo name="graduation-cap" size={40} color="#fff"  style={{ marginLeft:30,  }} />
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>B S U RESULT APP</Text>
            </TouchableOpacity>
          }
          rightComponent={
            <View style={styles.timerContainer}>
              <Entypo name="calendar" size={20} color="#fff" />
              <Text style={{ ...styles.timerText, color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{` ${formattedDate}`}</Text>
            </View>
          }
          containerStyle={{ backgroundColor: '#205CE5' }} // Set the header background color to navy blue
        />

      {/* <Image source={require('./../../assets/image/favicon-96x96.png')} style={styles.logo} /> */}
      <View style={styles.logoContainer}>
        <Image source={require('./../../assets/image/favicon-76x76.png')} style={styles.logo} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BENUE STATE</Text>
        <Text style={styles.headerText}>UNIVERSITY MARKURDI</Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper autoplay={true} style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide}>
            <Image source={require('./../../assets/image/BSUM.jpg')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('./../../assets/image/bsubestAlumni.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('./../../assets/icon.png')} style={styles.slideImage} />
          </View>
        </Swiper>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSignUpModalVisible(true)}
          activeOpacity={0.7}
          onPressIn={startAnimation}
          disabled={
            nameError !== '' ||
            emailError !== '' ||
            phoneError !== '' ||
            // addressError !== '' ||
            passwordError !== ''
          }
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSignInModalVisible(true)}
          activeOpacity={0.7}
          onPressIn={startAnimation}
          disabled={emailError !== '' || passwordError !== ''}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>


      {/* Sign Up Modal */}
      <Modal animationType="slide" transparent={true} visible={signUpModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSignUpModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={35} color="#00A8F0" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              onBlur={validateName}
            />
            {nameError !== '' && <Text style={styles.errorText}>{nameError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              onBlur={validatePhone}
            />
            {phoneError !== '' && <Text style={styles.errorText}>{phoneError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              onBlur={validatePassword}
            />
            {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSignUp}
              // onPress={()=>{navigation.navigate("App")}}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </Modal>

      {/* Sign In Modal */}
      <Modal animationType="slide" transparent={true} visible={signInModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSignInModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={35} color="#00A8F0" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Sign In</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              onBlur={validatePassword}
            />
            {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSignIn}
              // onPress={()=>{navigation.navigate("App")}}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#ffffff', // Set your desired background color
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#FFF',
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center', // Center vertically within the container
    alignItems: 'center', // Center horizontally within the container
  },
  logo: {
    width: '100%',
    // height: 120,
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#2B60DA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 20,
    borderColor:'red',
    borderWidth:5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },


  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },


  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 3,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor:'#CCC',
    fontWeight:'900'
  },
  modalButton: {
    backgroundColor: '#2B60DA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,

  },
  closeButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  backgroundContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 'auto',
    marginBottom: 95,
  },

  button: {
    backgroundColor: '#2B60DA',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 100,
    marginVertical: 12,
    marginHorizontal: 10,
    borderColor:'#00FCF0',
    borderWidth:5,
    
  },
  // logo: {
  //   width: '100%',
  //   height: 220,
  //   resizeMode: 'contain',
  //   // marginBottom: 0,
  // },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    color:'#2B60DA',
    fontWeight: 'bold',
  },
  swiperContainer: {
    flex: 4,
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 2,
  },
  swiper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#92BBD9',
  },
  slideImage: {
    height: '100%',
    width: '100%',
  },

});

export default StarterScreen;

