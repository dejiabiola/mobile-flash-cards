import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData, resetStore } from '../redux_store/actions'
import Deck from './Deck'
import { ScrollView } from 'react-native-gesture-handler'
import { resetDecks } from '../utils/api'
import { mainColor, darkerPurple } from '../utils/colors'


class DeckList extends Component {
  componentDidMount() {
    this.props.receiveDecks()
  }

  resetDeck = () => {
    this.props.resetStore()
    resetDecks()
    this.props.receiveDecks()
  }
  render() {
    const { decks } = this.props
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          {Object.values(decks).map(deck => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'Deck View', { title: deck.title }
              )}
              key={deck.title}
              style={{flex: 1}}
            >
              <Deck deck={deck} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={this.resetDeck}>
            <Text style={{color: darkerPurple}}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
  },
  text: {
    borderColor: 'black',
    borderWidth: 3,
    fontSize: 50
  },
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: () => dispatch(handleInitialData()),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)