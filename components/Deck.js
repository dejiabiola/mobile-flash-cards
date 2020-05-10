import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default function Deck(props) {
  const { deck } = props
  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text style={styles.deckCards}>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
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
