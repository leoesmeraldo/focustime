import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FocusHistory = ({ history }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Successfuly focused items:</Text>
      {
        history.map((item, i) => {
          return (
            <Text key={i}>{item}</Text>
          )
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold'
  }
})