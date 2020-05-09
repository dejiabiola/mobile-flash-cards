import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receive_decks, handleInitialData } from '../redux_store/actions'
import Deck from './Deck'
import { ScrollView } from 'react-native-gesture-handler'


class DeckList extends Component {
  componentDidMount() {
    this.props.receiveDecks()
  }
  render() {
    return (
      <View style={styles.container}>
        
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'Deck View', { title: 'Deck 1' }
            )}
          >
            <Deck />
          </TouchableOpacity>
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
  },
  deckTitle: {

  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)