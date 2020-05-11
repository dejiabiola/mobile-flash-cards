import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Button from './Button';
import { lightGreen, blue, mainColor, darkerPurple } from '../utils/colors';
import { connect } from 'react-redux';
import Deck from './Deck'
import { removeDeck } from '../redux_store/actions';
import { deleteDeck } from '../utils/api'
import { handleInitialData } from '../redux_store/actions'


 class DeckView extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
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
          <Deck deck={deck} style={{height: 300}}/>
        </View>
        <Button onPress={this.startQuiz} style={[styles.deckBtn, {backgroundColor: blue}]}>
          Start Quiz
        </Button>
        <Button onPress={this.addCard} style={[styles.deckBtn, {backgroundColor: lightGreen}]}>
          Add New Card
        </Button>
        <TouchableOpacity onPress={this.handleRemoveDeck} style={styles.removeBtn}>
          <Text style={{color: darkerPurple}}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: mainColor,
    paddingTop: 30
  },
  deckBtn: {
    padding: 20,
    width: 300,
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