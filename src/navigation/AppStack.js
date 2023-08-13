import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,Image, ImageBackground, ScrollView , Alert} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Entypo, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './../screens/HomeScreen';
import ProfileScreen from './../screens/ProfileScreen';
import NoticeBoardScreen from './../screens/NoticeBoardScreen';
import NoticeBoardDetailScreen from './../screens/NoticeBoardDetailScreen';
import DrawerContent from './../components/DrawerContent';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            return <Ionicons name={iconName} size={40} color={focused ? '#000080' : '#C0A2C0'} />;
          }else if (route.name === 'Profile') {
            iconName = 'account';
            return <MaterialCommunityIcons name={iconName} size={40} color={focused ? '#000080' : '#C0A2C0'} />;
          
          }else if (route.name === 'News') {
            iconName = 'newspaper';
            return <MaterialCommunityIcons name={iconName} size={40} color={focused ? '#000080' : '#C0A2C0'} />;
          
          }
        },
        tabBarStyle: {
          backgroundColor: '#ECECEC',
          borderColor:'#000080',
          borderWidth:5,
          borderTopWidth:5,
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4.65,
          elevation: 25,
        },
        tabBarItemStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold', // Set the tab bar text to bold
          color:'#000080'
        },
        tabBarItemActiveTintColor: '#ECECEC',
        tabBarItemInactiveTintColor: '#CCC',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}
          options = {{ 
                    headerShown:false, 
                      title:"Home ",
                    drawerIcon: ({ color, size }) => (
                     <MaterialCommunityIcons
                     name="home"
                     type="material"
                     color={color}
                     size={size}
                     />
                  ),
            }}
       />

      <Tab.Screen name="Profile" component={ProfileScreen} 
          options = {{ 
                    headerShown:false, 
                    drawerIcon: ({ color, size }) => (
                     <MaterialCommunityIcons
                     name="school"
                     type="material"
                     color={color}
                     size={size}
                     />
                  ),
            }}
      />
      <Tab.Screen name="News" component={NoticeBoardScreen} 
          options = {{ 
                    headerShown:false, 
                    drawerIcon: ({ color, size }) => (
                     <MaterialCommunityIcons
                     name="newspaper"
                     type="material"
                     color={color}
                     size={size}
                     />
                  ),
            }}
      />

    </Tab.Navigator>
  );
};

function DrawerNavigator(){
  const screenOptions = {
    drawerStyle: {
      width: '80%',
    },
    
    drawerContentOptions: {
      activeTintColor: '#ff9900',
      inactiveTintColor: '#999999',
      labelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
  };

  return (
    <Drawer.Navigator
        drawerContent={ props => <DrawerContent {...props} screenOptions={screenOptions} />}
    >
      <Drawer.Screen name=" Home " component={BottomTabNavigator} 
         options = {{ 
                    // headerShown:true, 
                    drawerIcon: ({ color, size }) => (
                     <AntDesign
                     name="home"
                     type="material"
                     color={color}
                     size={size}
                     />
                  ),
            }}
      />
     
      <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign
            name="user"
            size={size}
            color={color}
          />
        ),
      }}
    />
      <Drawer.Screen
      name="News"
      component={NoticeBoardScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons
            name="newspaper"
            size={size}
            color={color}
          />
        ),
      }}
    />
    </Drawer.Navigator>
  );
};



export default function AppStack() {

  const handleReset = () => {
    navigation.dispatch(StackActions.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }], // Specify the destination screen/route
    }));
  };
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="App" component={DrawerNavigator}
             options = {{ 
                    headerShown:false, 
                    // title: 'Sidebar'
                    // ...TransitionPresets.RevealFromBottomAndroid 
            }}
       />
      
       

<Stack.Screen 
  name="NoticeBoardDetailScreen" 
  component={NoticeBoardDetailScreen} 
  options={({ navigation }) => ({
    title: 'Notice Detail',
    headerTitleStyle: styles.headerTitle,
    headerShown: false, 
    headerTitleAlign: 'center', // Aligns the title text to the center
    tabBarIcon: ({ color, size }) => (
      <Ionicons 
        name='book'
        type='material'
        color={color}
        size={size}
      />
    ),
    headerLeft: () => (
      <Ionicons
        name="chevron-back-outline" 
        size={28} 
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 20 }}
      />
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>  
    ),
  })}
/>

<Stack.Screen 
  name="NoticeBoardScreen" 
  component={NoticeBoardScreen} 
  options={({ navigation }) => ({
    title: 'News Detail',
    headerTitleStyle: styles.headerTitle,
    headerShown: false, 
    headerTitleAlign: 'center', // Aligns the title text to the center
    tabBarIcon: ({ color, size }) => (
      <Ionicons 
        name='book'
        type='material'
        color={color}
        size={size}
      />
    ),
    headerLeft: () => (
      <Ionicons
        name="chevron-back-outline" 
        size={28} 
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 20 }}
      />
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>  
    ),
  })}
/>


<Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign
            name="user"
            size={size}
            color={color}
          />
        ),
      }}
    />



</Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
})