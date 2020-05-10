import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { darkerPurple } from '../utils/colors'
import Button from './Button'
import { addCard } from '../redux_store/actions'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'

class AddCardScreen extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleQuestionChange = (value) => {
    this.setState({
      question: value
    })
  }

  handleAnswerChange = (value) => {
    this.setState({
      answer: value
    })
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const { title } = this.props.route.params
    this.props.dispatch(addCard(title, {question, answer}))
    addCardToDeck(title, {question, answer})
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={[styles.block]}>
            <Text>Enter a New Question</Text>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder="Enter Question"
              autoFocus={true}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => this.answerTextInput.focus()}
            />
          </View>
          <View style={[styles.block]}>
            <Text>Enter the Answer to the Question</Text>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Enter Answer"
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
              ref={input => {
                this.answerTextInput = input;
              }}
            />
          </View>
        <Button onPress={this.handleSubmit} style={[styles.deckBtn, {backgroundColor: darkerPurple}]} 
          disabled={this.state.question === '' || this.state.answer === ''}
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




export default connect()(AddCardScreen)