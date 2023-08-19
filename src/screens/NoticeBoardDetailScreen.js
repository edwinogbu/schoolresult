import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const NoticeBoardDetailScreen = ({ navigation, route }) => {
  const { announcement } = route.params;

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="ios-arrow-back" size={24} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 20 }}>Back</Text>
          </TouchableOpacity>
        }
        // backgroundColor="#000080"
        backgroundColor="#205CE5"
        centerComponent={{ text: 'BSU News Detail', style: styles.headerText }}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name={announcement.icon} size={24} color="black" style={styles.icon} />
            <Text style={styles.title}>{announcement.title}</Text>
          </View>
          <Image source={announcement.image} style={styles.image} />
          <Text style={styles.date}>{announcement.date}</Text>
          <Text style={styles.note}>{announcement.note}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
  },
});

export default NoticeBoardDetailScreen;
