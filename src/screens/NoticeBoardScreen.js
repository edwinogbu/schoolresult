import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import announcementData from '../constant/announcement';


const NoticeBoardScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [filteredData, setFilteredData] = useState(announcementData);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage] = useState(5);
  const lastVisibleIndex = pageNumber * itemsPerPage;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleFilter = (filterText) => {
    const filteredAnnouncements = announcementData.filter((announcement) =>
      announcement.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(filteredAnnouncements);
    setPageNumber(1);
  };

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const renderItem = ({ item }) => {
    const { icon, title, date, note, image } = item;
    let displayedNote = note;
    let readMoreLink = null;

    // Split the note by spaces to count words
    const words = note.split(' ');

    // Check if the note exceeds 3 words or 20 characters
    if (words.length > 3 || note.length > 20) {
      displayedNote = words.slice(0, 3).join(' ');
      readMoreLink = '... Read More';
    }

    return (
      <TouchableOpacity
        style={[styles.listItem, { opacity: fadeAnim }]}
        onPress={() => navigation.navigate('NoticeBoardDetailScreen', { announcement: item })}
      >
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon} size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.dateText}>{date}</Text>
            <Text>
              {displayedNote}
              {readMoreLink && <Text style={styles.readMoreLink}>{readMoreLink}</Text>}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <MaterialIcons name="search" size={24} color="black" style={styles.filterIcon} />
        <TextInput
          style={styles.filterInput}
          placeholder="Search by title..."
          onChangeText={handleFilter}
          placeholderTextColor="#888888"
        />
      </View>
      <FlatList
        data={filteredData.slice(0, lastVisibleIndex)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
        ListFooterComponent={<Text style={styles.loadMoreText}>Loading more...</Text>}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor:'#000080'
  },
  filterIcon: {
    margin: 10,
  },
  filterInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ECECEC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
    backgroundColor:'#FFFFFF'
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    color: '#888888',
  },
  imageContainer: {
    marginLeft: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  readMoreLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  loadMoreText: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#888888',
  },
});

export default NoticeBoardScreen;
