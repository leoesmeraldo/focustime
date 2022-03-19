import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors.js';
import { Focus } from './src/features/Focus';
import { TextInput } from 'react-native-paper';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory'
import { Test } from './src/features/Test'


export default function App() {
  const [currentSubject, setCurrentSubject] = useState('')
  const [history, setHistory] = useState([1, 2, 3])

  return (
    !currentSubject ? (
    <SafeAreaView style={styles.container}>
      <Focus addSubject={setCurrentSubject}/>
      <FocusHistory history={history}/>
    </SafeAreaView>

    ) : (
      <SafeAreaView style={styles.container}>
        <Timer 
          passSubject={currentSubject}
          clearSubject={ () => setCurrentSubject(null) }
          onTimerEnds={ () => setHistory([...history, currentSubject]) }
        />
      </SafeAreaView>
    )
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.mediumAquamarine
  },
  inputContainer: {
    flex: 0.3,
    justifyContent: 'top',
    padding: 25
  }
});
