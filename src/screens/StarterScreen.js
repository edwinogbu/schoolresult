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
} from 'react-native';

import { Icon, Header } from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';



const StarterScreen = ({ navigation }) => {
  // const { signIn, signUp, setUser } = useContext(AuthContext);

  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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

        // const user = await signUp(name, email, phone, password);
        console.log(user);
        // User successfully signed up, setUser to update the user state in context
        setUser({
          name,
          email,
          phone,
          password
        });
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setSignUpModalVisible(false);
      } catch (error) {
        console.log('Sign up error:', error);
      }
    }
  };

  const handleSignIn = () => {
    validateName();
    validatePassword();

    if (emailError === '' && passwordError === '') {
      // signIn(email, password);
      setEmail('');
      setPassword('');
      setSignInModalVisible(false);
      // console.log("signinng in")
      navigation.navigate("Home");
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
       centerComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ fontWeight: 'bold', fontSize: 22 }}>
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
        containerStyle={{ backgroundColor: '#000080' }} // Set the header background color to navy blue
      />


      <ImageBackground
        source={require('./../../assets/icon.png')}
        style={styles.backgroundContainer}
        resizeMode="cover"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSignUpModalVisible(true)}
            activeOpacity={0.7}
            onPressIn={startAnimation}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setSignInModalVisible(true)}
            activeOpacity={0.7}
            onPressIn={startAnimation}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>


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
              // onPress={handleSignIn}
              onPress={()=>{navigation.navigate("App")}}
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
  container: {
    flex: 1,
    backgroundColor:'#0000FF'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: '#000080', // Navy Blue color
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontWeight: '900',
  },
  modalButton: {
    backgroundColor: '#000080', // Navy Blue color
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
    backgroundColor: '#000080', // Navy Blue color
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 100,
    marginVertical: 12,
    marginHorizontal: 10,
    borderColor: '#FFFF00',
    borderWidth: 5,
  },
});

export default StarterScreen;


