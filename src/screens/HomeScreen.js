
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Alert, Modal } from 'react-native';
import studentResults from './../constant/studentResults';

const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onValueChange(option);
                  setModalVisible(false);
                }}
                style={styles.modalOption}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const HomeScreen = () => {
  // Rest of the code remains unchanged
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [session, setSession] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');

  const handleRegistrationNumberChange = (value) => {
    setRegistrationNumber(value);
    setMatricNumber(value);
  };

  const handleSemesterChange = (value) => {
    setSemester(value);
  };

  const handleSessionChange = (value) => {
    setSession(value);
  };

  const handleViewResult = () => {
    if (!semester) {
      Alert.alert('Validation Error', 'Please select a semester.');
    } else if (!session) {
      Alert.alert('Validation Error', 'Please select an option.');
    } else if (!registrationNumber) {
      Alert.alert('Validation Error', 'Please enter a registration number.');
    } else {
      const filteredResults = filteredRegistrationResults.filter(
        (result) =>
          result.registrationNumber.toLowerCase() === registrationNumber.toLowerCase() ||
          result.matricNumber.toLowerCase() === matricNumber.toLowerCase()
      );

      if (filteredResults.length === 0) {
        if (matricNumber && registrationNumber) {
          Alert.alert('Not Found', 'The entered matric number and registration number were not found. Please review your entries.');
        } else if (matricNumber) {
          Alert.alert('Not Found', 'The entered matric number is not found or does not exist.');
        } else if (registrationNumber) {
          Alert.alert('Not Found', 'The entered JAMB registration number is not found or does not exist.');
        }
      } else {
        // Get the department and level from the first result in the filteredResults array
        const { department, level } = filteredResults[0];

        // Show the department and level in the HomeScreen component
        setDepartment(department);
        setLevel(level);

        setShowTable(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const filteredRegistrationResults = studentResults.filter(
    (result) =>
      (!registrationNumber || result.registrationNumber == registrationNumber || result.matricNumber.toLowerCase() == matricNumber.toLowerCase()) &&
      (!semester || result.semester.toLowerCase() === semester.toLowerCase()) &&
      (!session || result.session === session)
  );


  const tableHead = ['Course Code', 'Course Title', 'Semester', 'Grade', 'Result'];
  const tableData = filteredRegistrationResults.flatMap((result) =>
    result.courses.map((course) => [
      course.courseCode,
      course.courseTitle,
      result.semester,
      course.grade,
      course.status,
    ])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {showAlert && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
              (Simply Enter Jamb/Matric Number, Select Session, Semester To view result)
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAlert}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.rowContainer}>

      <View style={styles.tabContainer}>
        <Text style={styles.tabTitle}>Semester:</Text>
        <CustomPicker
          options={Array.from(new Set(studentResults.map((result) => result.semester)))}
          selectedValue={semester}
          onValueChange={handleSemesterChange}
          placeholder="Select Semester"
        />
      </View>

      <View style={styles.tabContainer}>
        <Text style={styles.tabTitle}>Session:</Text>
        <CustomPicker
          options={Array.from(new Set(studentResults.map((result) => result.session)))}
          selectedValue={session}
          onValueChange={handleSessionChange}
          placeholder="Select Session"
        />
      </View>
      </View>

          <View style={{ flexDirection: 'row', margin: 3, marginLeft: 15 }}>
            <Text style={styles.tabTitle}>Registration Number:</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="E.g Enter bsu/cmp/19/1000 or 001"
                onChangeText={handleRegistrationNumberChange}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleViewResult}>
            <Text style={styles.buttonText}>View Result</Text>
          </TouchableOpacity>
        </View>

        {showTable && (
          <View style={styles.card}>

            <Text style={styles.cardTitle}>Department: {department}</Text>
            <Text style={styles.cardTitle}>Level: {level}</Text>
            <View style={styles.table}>
              
              <View style={[styles.tableRow, styles.head]}>
                {tableHead.map((header, index) => (
                  <Text key={index} style={[styles.tableCell, styles.headText]}>{header}</Text>
                ))}
              </View>

              {/* Table Data */}
              {tableData.map((rowData, index) => (
                <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                  {rowData.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.tableCell}>{cell}</Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
container: {
flexGrow: 1,
padding: 16,
backgroundColor: '#f8f8f8',
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 16,
textAlign: 'center',
color: '#00048D',
},
card: {
marginBottom: 16,
padding: 16,
borderRadius: 8,
elevation: 3,
backgroundColor: '#ffffff',
},
cardTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 8,
color: '#00048D',
},
rowContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 16,
},
tabContainer: {
flex: 1,
marginRight: 8,
},
tabTitle: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 8,
},
dropdownContainer: {
height: 48,
},
dropdown: {
backgroundColor: '#00048D',
color: '#FFF',
fontWeight: '900',
borderRadius: 24,
},
textInputContainer: {
flex: 1,
marginLeft: 8,
},
textInput: {
height: 48,
borderWidth: 2,
// borderColor: '#00048D',
borderColor: '#205CE5',
paddingHorizontal: 8,
borderRadius: 24,
fontWeight: '900',
},
table: {
marginTop: 10,
},
tableRow: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingVertical: 8,
borderBottomWidth: 1,
borderBottomColor: '#ddd',
},
tableCell: {
flex: 1,
textAlign: 'center',
color: '#000000',
fontWeight:'bold',
},
head: {
height: 40,
backgroundColor: '#00048D',
},
headText: {
fontWeight: 'bold',
textAlign: 'center',
color: '#FFF',
},
evenRow: {
backgroundColor: '#f8f8f8',
},
oddRow: {
backgroundColor: '#ffffff',
},
button: {
backgroundColor: '#00048D',
paddingHorizontal: 40,
padding: 10,
borderRadius: 25,
marginTop: 10,
alignSelf: 'center',
},
buttonText: {
color: 'white',
fontSize: 16,
fontWeight: 'bold',
},
rowText: {
fontSize: 14,
textAlign: 'center',
// Add any other text styles here if required
},
dropdownItem: {
borderWidth: 1,
borderColor: '#00048D',
borderRadius: 24,
backgroundColor: '#00048D',
paddingHorizontal: 8,
height: 48,
color: '#FFF',
fontWeight: '900',
},
alertContainer: {
backgroundColor: '#FEE8E3',
paddingHorizontal: 16,
paddingVertical: 10,
borderRadius: 8,
marginBottom: 16,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
},
alertText: {
fontWeight: '900',
fontSize: 14,
color: '#00048D',
},
closeButton: {
backgroundColor: '#00048D',
paddingHorizontal: 10,
paddingVertical: 6,
borderRadius: 20,
},
closeButtonText: {
color: 'white',
fontSize: 12,
fontWeight: 'bold',
},

dropdownContainer: {
  height: 48,
  borderWidth: 2,
  borderColor: '#00048D',
  paddingHorizontal: 8,
  borderRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
},
dropdownText: {
  fontSize: 16,
  fontWeight: '900',
  color: '#00048D',
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: '#FFF',
  borderRadius: 8,
  paddingVertical: 16,
  paddingHorizontal: 20,
  minWidth: 200,
  maxWidth: 300,
  maxHeight: 200,
},
modalOption: {
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  alignItems: 'center',
},
});

export default HomeScreen;

