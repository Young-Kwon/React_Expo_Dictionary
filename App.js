//"StAuth10244: I Young Sang Kwon, 000847777 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else."

import React, { useState } from 'react';
import { View, TextInput, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

const App = () => {
  const [inputWord, setInputWord] = useState('');
  const [wordData, setWordData] = useState([]);

  const fetchWordData = async (word) => {
    if (word.length === 0) {
      setWordData([]);
      return;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (data && data.length > 0) {
        setWordData(data[0].meanings[0].definitions.map((def) => def.definition));
      } else {
        setWordData(["No data found."]);
      }
    } catch (error) {
      console.error(error);
      setWordData(["Error fetching data."]);
    }
  };

  const resetSearch = () => {
    setInputWord('');
    setWordData([]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/vocabulary.jpg')}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputWord}
          value={inputWord}
          placeholder="Enter a word"
        />
        <Button
          title="Search"
          onPress={() => fetchWordData(inputWord)}
        />
        <Button
          title="Reset"
          onPress={resetSearch}
          color="red"
        />
      </View>
      <FlatList
        data={wordData}
        renderItem={({ item }) => <Text style={styles.word}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  word: {
    fontSize: 20,
    marginVertical: 5,
  },
  list: {
    width: '80%',
  },
  image: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default App;