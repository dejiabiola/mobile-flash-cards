import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { mainColor } from '../utils/colors'

export default function QuizCardEmpty() {
  return (
    <View style={styles.emptyContainer} >
      <Image
        style={{ width: 150, height: 150, marginBottom: 30 }}
        source={require('../assets/images/box-empty.png')}
      />
      <Text style={styles.emptyText} >
        Sorry you cannot take a quiz because there are no cards in this deck.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: mainColor
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15
  },
})

