import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button';
import { white, lightGreen, blue } from '../utils/colors';
import { connect } from 'react-redux';
import Deck from './Deck'

class DeckView extends Component {
  
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
    deck: state[title]
  }
}

export default connect(mapStateToProps)(DeckView)