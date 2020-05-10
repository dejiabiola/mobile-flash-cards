import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Button from './Button';
import { white, lightGreen, blue } from '../utils/colors';
import { connect } from 'react-redux';
import Deck from './Deck'
import { removeDeck } from '../redux_store/actions';
import { deleteDeck } from '../utils/api'
import { handleInitialData } from '../redux_store/actions'


 class DeckView extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.deck !== undefined;
  // }
  
  componentWillUnmount() {
    // Doing this because the decklist does not rerender to show that an object has been deleted from store
    this.props.receiveDecks()
  }
  addCard = () => {
    this.props.navigation.navigate(
      'Add Card', {title: this.props.route.params.title}
    )
  }

  startQuiz = () => {
    this.props.navigation.navigate(
      'Quiz', {title: this.props.route.params.title}
    )
  }

  handleRemoveDeck = () => {
    const {remove, goBack, deck} = this.props
    remove()
    deleteDeck(deck.title)
    goBack()
  }

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}> 
        <View>
          <Deck deck={deck} />
        </View>

        <Button onPress={this.addCard} style={[styles.deckBtn, {backgroundColor: lightGreen}]}>
          Add Card
        </Button>
        <Button onPress={this.startQuiz} style={[styles.deckBtn, {backgroundColor: blue}]}>
          Start Quiz
        </Button>
        <TouchableOpacity onPress={this.handleRemoveDeck} style={styles.removeBtn}>
          <Text style={styles.text}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckBtn: {
    padding: 10,
    width: 200,
    marginBottom: 30,
    borderRadius: 5
  }
})

const mapStateToProps = (state, {route}) => {
  const {title} = route.params
  return {
    deck: state[title],
  }
}

const mapDispatchToProps = (dispatch, { route, navigation }) => {
  const { title } = route.params
  return {
    remove: () => dispatch(removeDeck(title)),
    goBack: () => navigation.goBack(),
    receiveDecks: () => dispatch(handleInitialData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)