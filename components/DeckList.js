import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


class DeckList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'Deck View', { title: 'Deck 1' }
            )}
          ><Text>Click to Show Detail</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    borderColor: 'black',
    borderWidth: 3,
    
    fontSize: 50
  }
})

export default DeckList