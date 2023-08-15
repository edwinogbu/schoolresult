import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const ProfileField = ({ label, value, editing, onChangeText }) => {
  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      {editing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => onChangeText(text)}
        />
      ) : (
        <Text style={styles.text}>{value}</Text>
      )}
    </>
  );
};

const EditButton = ({ onPress }) => (
  <TouchableOpacity style={styles.editButton} onPress={onPress}>
    <FontAwesome5 name="edit" size={20} color="#FFF" />
    <Text style={styles.editButtonText}>Edit</Text>
  </TouchableOpacity>
);

const SaveCancelButton = ({ onSave, onCancel }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
      <View style={styles.buttonContent}>
        <Ionicons name="close" size={20} color="#FFF" />
        <Text style={styles.editButtonText}>Close</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
      <View style={styles.buttonContent}>
        <FontAwesome5 name="check" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Update</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
  });
  const [editing, setEditing] = useState(false);
  const [originalUserDetails, setOriginalUserDetails] = useState({});
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchUserDetails();
    setGreeting(getGreeting());
  }, []);

  const fetchUserDetails = () => {
    setUserDetails({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    });
    setOriginalUserDetails({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    setEditing(false);
    console.log('User details updated successfully.');
  };

  const handleCancel = () => {
    setEditing(false);
    setUserDetails(originalUserDetails);
  };

  const handleInputChange = (key, value) => {
    setUserDetails(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.greeting}>{greeting}</Text>

          <ProfileField
            label="Name"
            value={userDetails.name}
            editing={editing}
            onChangeText={text => handleInputChange('name', text)}
          />

          <ProfileField
            label="Email"
            value={userDetails.email}
            editing={editing}
            onChangeText={text => handleInputChange('email', text)}
          />

          <ProfileField
            label="Phone"
            value={userDetails.phone}
            editing={editing}
            onChangeText={text => handleInputChange('phone', text)}
          />

          {editing ? (
            <SaveCancelButton onSave={handleUpdate} onCancel={handleCancel} />
          ) : (
            <EditButton onPress={handleEdit} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  card: {
    width: '80%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CD964',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 20,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '900',
    padding: 10,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
});

export default ProfileScreen;


// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// // import { AuthContext } from './../screens/AuthContext';

// const useUserIdFromFirestore = () => {
//   // const { state: { user } } = useContext(AuthContext);
//   if (user) {
//     return user.uid;
//   } else {
//     throw new Error('User is not logged in');
//   }
// };

// const ProfileField = ({ label, value, editing, onChangeText }) => {
//   return (
//     <>
//       <Text style={styles.label}>{label}:</Text>
//       {editing ? (
//         <TextInput
//           style={styles.input}
//           value={value}
//           onChangeText={text => onChangeText(text)}
//         />
//       ) : (
//         <Text style={styles.text}>{value}</Text>
//       )}
//     </>
//   );
// };

// const EditButton = ({ onPress }) => (
//   <TouchableOpacity style={styles.editButton} onPress={onPress}>
//     <FontAwesome5 name="edit" size={20} color="#FFF" />
//     <Text style={styles.editButtonText}>Edit</Text>
//   </TouchableOpacity>
// );

// const SaveCancelButton = ({ onSave, onCancel }) => (
//   <View style={styles.buttonContainer}>
//     <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
//       <View style={styles.buttonContent}>
//         <Ionicons name="close" size={20} color="#FFF" />
//         <Text style={styles.editButtonText}>Close</Text>
//       </View>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.saveButton} onPress={onSave}>
//       <View style={styles.buttonContent}>
//         <FontAwesome5 name="check" size={20} color="#FFF" />
//         <Text style={styles.buttonText}>Update</Text>
//       </View>
//     </TouchableOpacity>
//   </View>
// );

// const ProfileScreen = () => {
//   const { state } = useContext(AuthContext);

//   const [userDetails, setUserDetails] = useState({
//     name: 'John Doe',
//     email: 'john@example.com',
//     phone: '+1234567890',
//   });
//   const [editing, setEditing] = useState(false);
//   const [originalUserDetails, setOriginalUserDetails] = useState({});
//   const [greeting, setGreeting] = useState('');

//   useEffect(() => {
//     fetchUserDetails();
//     setGreeting(getGreeting());
//   }, []);

//   const fetchUserDetails = async () => {
//     // Simulate fetching user details
//     setUserDetails({
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1234567890',
//     });
//     setOriginalUserDetails({
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1234567890',
//     });
//   };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleUpdate = () => {
//     setEditing(false);
//     console.log('User details updated successfully.');
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     setUserDetails(originalUserDetails);
//   };

//   const handleInputChange = (key, value) => {
//     setUserDetails(prevState => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const getGreeting = () => {
//     const currentHour = new Date().getHours();
//     if (currentHour >= 5 && currentHour < 12) {
//       return 'Good Morning';
//     } else if (currentHour >= 12 && currentHour < 18) {
//       return 'Good Afternoon';
//     } else {
//       return 'Good Evening';
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <View style={styles.card}>
//           <Text style={styles.greeting}>{greeting}</Text>

//           <ProfileField
//             label="Name"
//             value={userDetails.name}
//             editing={editing}
//             onChangeText={text => handleInputChange('name', text)}
//           />

//           <ProfileField
//             label="Email"
//             value={userDetails.email}
//             editing={editing}
//             onChangeText={text => handleInputChange('email', text)}
//           />

//           <ProfileField
//             label="Phone"
//             value={userDetails.phone}
//             editing={editing}
//             onChangeText={text => handleInputChange('phone', text)}
//           />

//           {editing ? (
//             <SaveCancelButton onSave={handleUpdate} onCancel={handleCancel} />
//           ) : (
//             <EditButton onPress={handleEdit} />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   contentContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingBottom: 20,
//   },
//   card: {
//     width: '80%',
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   greeting: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   input: {
//     fontSize: 16,
//     marginBottom: 16,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#4CD964',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     flex: 1,
//     marginLeft: 10,
//   },
//   editButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FF6347',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderWidth: 2,
//     borderColor: '#FFF',
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   editButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     marginLeft: 10,
//     fontWeight: '900',
//     padding: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 10,
//   },
// });

// export default ProfileScreen;


// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// import {FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';

// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import {  firestore } from './../../firebase';
// import { AuthContext } from './../screens/AuthContext';

// const useUserIdFromFirestore = () => {
//   const { state: { user } } = useContext(AuthContext);
//   if (user) {
//     return user.uid;
//   } else {
//     throw new Error('User is not logged in');
//   }
// };

// const ProfileField = ({ label, value, editing, onChangeText }) => {
//   return (
//     <>
//       <Text style={styles.label}>{label}:</Text>
//       {editing ? (
//         <TextInput
//           style={styles.input}
//           value={value}
//           onChangeText={text => onChangeText(text)}
//         />
//       ) : (
//         <Text style={styles.text}>{value}</Text>
//       )}
//     </>
//   );
// };

// const EditButton = ({ onPress }) => (
//   <TouchableOpacity style={styles.editButton} onPress={onPress}>
//     <FontAwesome5 name="edit" size={20} color="#FFF" />
//     <Text style={styles.editButtonText}>Edit</Text>
//   </TouchableOpacity>
// );

// const SaveCancelButton = ({ onSave, onCancel }) => (
//   <View style={styles.buttonContainer}>
//     <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
//       <View style={styles.buttonContent}>
//         <Ionicons name="close" size={20} color="#FFF" />
//         <Text style={styles.editButtonText}>Close</Text>
//       </View>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.saveButton} onPress={onSave}>
//       <View style={styles.buttonContent}>
//         <FontAwesome name="check" size={20} color="#FFF" />
//         <Text style={styles.buttonText}>Update</Text>
//       </View>
//     </TouchableOpacity>
//   </View>
// );

// const ProfileScreen = () => {
//   const { state, saveUserDetail } = useContext(AuthContext);
//   const userId = useUserIdFromFirestore(); // Use the custom hook to get the user ID

//   const [userDetails, setUserDetails] = useState({
//     name: state.user?.displayName || '',
//     email: state.user?.email || '',
//     phone: state.user?.phoneNumber || '',
//   });
//   const [editing, setEditing] = useState(false);
//   const [originalUserDetails, setOriginalUserDetails] = useState({});
//   const [greeting, setGreeting] = useState('');

//   useEffect(() => {
//     fetchUserDetails();
//     setGreeting(getGreeting());
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       if (!userId) {
//         console.log('No authenticated user found.');
//         return;
//       }

//       const userDocRef = doc(firestore, 'users', userId);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setUserDetails(userData);
//         setOriginalUserDetails(userData);
//       } else {
//         // No need to do anything here as we are already setting the userDetails state from state.user
//       }
//     } catch (error) {
//       console.log('Error fetching user details:', error.message);
//     }
//   };
  
//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       // We already have the user ID from the custom hook, so no need to use getUserIdFromFirestore() here.
//       await saveUserDetail(userId, userDetails); // Save the updated user details to Firestore
//       setEditing(false);
//       setOriginalUserDetails(userDetails);
//       console.log('User details updated successfully.');
//     } catch (error) {
//       console.log('Error updating user details:', error.message);
//     }
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     setUserDetails(originalUserDetails);
//   };

//   const handleInputChange = (key, value) => {
//     setUserDetails(prevState => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const getGreeting = () => {
//     const currentHour = new Date().getHours();
//     if (currentHour >= 5 && currentHour < 12) {
//       return 'Good Morning';
//     } else if (currentHour >= 12 && currentHour < 18) {
//       return 'Good Afternoon';
//     } else {
//       return 'Good Evening';
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <View style={styles.card}>
//           <Text style={styles.greeting}>{greeting}</Text>

//           <ProfileField
//             label="Name"
//             value={userDetails.name}
//             editing={editing}
//             onChangeText={text => handleInputChange('name', text)}
//           />

//           <ProfileField
//             label="Email"
//             value={userDetails.email}
//             editing={editing}
//             onChangeText={text => handleInputChange('email', text)}
//           />

//           <ProfileField
//             label="Phone"
//             value={userDetails.phone}
//             editing={editing}
//             onChangeText={text => handleInputChange('phone', text)}
//           />

//           {editing ? (
//             <SaveCancelButton onSave={handleUpdate} onCancel={handleCancel} />
//           ) : (
//             <EditButton onPress={handleEdit} />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   contentContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingBottom: 20,
//   },
//   card: {
//     width: '80%',
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   greeting: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   input: {
//     fontSize: 16,
//     marginBottom: 16,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#4CD964',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     flex: 1,
//     marginLeft: 10,
//   },
//   editButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FF6347',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderWidth: 2,
//     borderColor: '#FFF',
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   editButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     marginLeft: 10,
//     fontWeight: '900',
//     padding: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 10,
//   },
// });

// export default ProfileScreen;

