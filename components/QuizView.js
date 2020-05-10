import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

class QuizView extends Component {
  render() {
    const { deck } = this.props
    if (deck.questions.length === 0) {
      return (
        <View style={styles.emptyContainer} >
          <Image
            style={{ width: 150, height: 150, marginBottom: 30 }}
            source={require('../assets/images/box-empty.png')}
          />
          <Text style={styles.emptyText} >
            Sorry you cannot take a quiz because there are no cards in this deck.
          </Text>
        </View>
      )
    }


    return (
      <View>
        <Text>Quiz view will be built imminently</Text>
      </View>
    )
  }
}

const mapStateToProps = (state, {route}) => {
  const {title} = route.params
  return {
    deck: state[title]
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15
  }
})

export default connect(mapStateToProps)(QuizView)