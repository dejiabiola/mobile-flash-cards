import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../redux_store/actions/index'
import Button from './Button'
import { darkerPurple } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { CommonActions } from '@react-navigation/native';

class AddDeckScreen extends Component {
  state = {
    deckTitle: ''
  }

  handleChange = (value) => {
    this.setState({
      deckTitle: value
    })
  }

  handleSubmit = () => {
    const { deckTitle } = this.state
    const { addDeck } = this.props
    addDeck(deckTitle)
    saveDeckTitle(deckTitle)
    this.toHome()
    this.setState({
      deckTitle: ''
    })
  }

  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'Add Deck',
      })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.block]}>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            value={this.state.deckTitle}
            onChangeText={this.handleChange}
            placeholder="Enter new deck title"
            autoFocus={false}
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <Button onPress={this.handleSubmit} style={[styles.deckBtn, {backgroundColor: darkerPurple}]} 
          disabled={this.state.deckTitle === ''}
        >
          Submit
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100
  },
  deckBtn: {
    padding: 10,
    width: 200,
    marginBottom: 30,
    borderRadius: 5
  },
  block: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    width: 300,
    marginBottom: 30
  }
})





export default connect(null, { addDeck })(AddDeckScreen)