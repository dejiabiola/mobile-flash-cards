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
    backgroundColor: '#A3C43B',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    maxWidth: '100%',
    marginBottom: 30,
    borderRadius: 10
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
