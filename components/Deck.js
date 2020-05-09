import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default function Deck() {
  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>Deck 1</Text>
      <Text style={styles.deckCards}>3 cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    marginBottom: 30,
  },
  deckTitle: {
    fontSize: 30,
    marginBottom: 1
  },
  deckCards: {
    fontSize: 15,
    color: 'gray'
  }
})
