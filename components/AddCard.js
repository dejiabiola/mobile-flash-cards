import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { darkerPurple } from '../utils/colors'
import Button from './Button'

class AddCard extends Component {
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
      
    })
  }

  render() {
    const { title } = this.props.route.params
    return (
      <View style={styles.container}>
        {title && <Text>{title}</Text>}
        <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder="Enter Question"
              autoFocus={true}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Enter Answer"
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
        <Button onPress={this.onSubmit} style={[styles.deckBtn, {backgroundColor: darkerPurple}]}>
          Submit
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
    height: 40
  }
})

export default AddCard