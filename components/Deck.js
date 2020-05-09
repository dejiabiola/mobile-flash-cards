import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default function Deck() {
  return (
    <View>
      <Text>Deck 1</Text>
      <Text>3 cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  deckCards: {
    fontSize: 10
  }
})
