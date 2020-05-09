import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button';
import { white, lightGreen, blue } from '../utils/colors';

class DeckView extends Component {
  
  addCard = () => {
    this.props.navigation.navigate(
      'AddCard', {title: this.props.route.params.title}
    )
  }

  startQuiz = () => {
    alert('You clicked start quiz button')
  }

  render() {
    const { route } = this.props;
    return (
      <View style={styles.container}> 
        {route.params.title && <Text>{route.params.title}</Text>}
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

export default DeckView