import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class QuizView extends Component {

  state = {
    duration: 5000,
    side: 0,
    sides: [],
    progress: new Animated.Value(0),
    rotation: new Animated.ValueXY({ x: 50, y: 50 }),
    zoom: new Animated.Value(0),
    rotateOrientation: "",
    flipDirection: "y"
  }

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
      <View style={styles.container}>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card1]}
          onPress={() => this.card.flip()}>
          <Text style={styles.label}>AB</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card2]}
          onPress={() => this.card.flip()}>
          <Text style={styles.label}>CD</Text>
        </TouchableOpacity>
      </CardFlip>
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }

})



export default connect(mapStateToProps)(QuizView)