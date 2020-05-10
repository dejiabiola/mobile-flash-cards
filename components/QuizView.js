import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button';

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardView: false,
      correct: 0,
      incorrect: 0,
      index: 0,
      questionsCompleted: false
    }

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }

  handleQuestionAnswerToggle = () => {
    this.setState((oldState) => ({
      cardView: !oldState.cardView
    }))
    this.flip_Animation()
  }

  flip_Animation = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 90,
        friction: 8,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        tension: 90,
        friction: 8,
      }).start();
    }
  };

  handleUserAnswer = (answer) => {
    if (this.state.cardView === true) {
      this.flip_Animation()
      this.setState((oldState) => ({
        cardView: !oldState.cardView
      }))
    }
    if (answer === 'correct') {
      this.setState((oldState) => ({
        correct: oldState.correct + 1,
      }))
    } else {
      this.setState((oldState) => ({
        incorrect: oldState.incorrect + 1,
      }))
    }
    this.setState((oldState) => ({
      index: oldState.index + 1
    }), 
    () => {
      const { index } = this.state
      const { questions } = this.props.deck
      if (index === questions.length) {
        this.setState({
          questionsCompleted: true
        })
      }
    })
  }

  setStatesForUserAnswer = () => {
    
  }

  handleResetQuiz = () => {
    this.flip_Animation()

    this.setState(() => ({
      correct: 0,
      incorrect: 0,
      index: 0,
      questionsCompleted: false
    }))
  }

  render() {
    const { deck } = this.props
    const { cardView, questionsCompleted, correct } = this.state
    // If there is no card in the deck
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

    // If the users has answered all the cards in the deck
    if (questionsCompleted) {
      return (
        <View style={{flex: 1}}>
          <Text>You have answered all the questions in this deck</Text>
          <Text>You scored</Text>
          <Text>{correct} out of {deck.questions.length}</Text>
          <Button
            style={{backgroundColor: 'green', padding: 20, marginBottom: 20, width: "100%", marginTop: 20}}
            onPress={this.handleResetQuiz}
          >
            Restart Quiz
          </Button>
          <Button
            onPress={() => {
              this.handleResetQuiz
              this.props.navigation.goBack()
            }}
            style={{backgroundColor: 'green', padding: 20, marginBottom: 20, width: "100%", marginTop: 20}}
          >
            Back to Deck
          </Button>
        </View>
      )
    }

    // All the code below are for if there are cards in the deck

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
    
    this.elevationFront = this.animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [10, 0]
    })
  
    this.elevationBack = this.animatedValue.interpolate({
      inputRange: [155, 180],
      outputRange: [0, 10]
    })
    const frontAnimatedStyle = {
    transform: [{ rotateY: this.frontInterpolate}]
    }
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    }

    return (
      <View style={styles.MainContainer}>
        {deck.questions.map((question, index) => {
          if (this.state.index === index) {
            return (
              <View key={index}>
                <View style={{alignItems: 'flex-start', marginBottom: 10}}>
                  <Text>{index + 1} / {deck.questions.length}</Text>
                </View>
                <View style={{width: 350, marginBottom: -200}}>
                  <Animated.View style={[frontAnimatedStyle, styles.paperFront,{elevation: this.elevationFront}, {opacity: this.frontOpacity}]}>
                    <Text style={styles.cardTopic}>Question</Text>
                    <Text style={styles.cardText}>
                      {question.question}
                    </Text>
                  </Animated.View>
                  <Animated.View style={[backAnimatedStyle, styles.paperBack, {elevation: this.elevationBack}, {opacity: this.backOpacity}]}>
                    <Text style={styles.cardTopic}>Answer</Text>
                    <Text style={styles.cardText}>
                      {question.answer}
                    </Text>
                  </Animated.View>
                </View>
              </View>
            )
          }
        })}
        <TouchableOpacity style={styles.button} onPress={this.handleQuestionAnswerToggle}>
          <Text style={styles.TextStyle}>{cardView === false ? 'Show Answer' : 'Show Question'}</Text>
        </TouchableOpacity>
        <Button 
          onPress={() => this.handleUserAnswer('correct')}
          style={{backgroundColor: 'green', padding: 20, marginBottom: 20, width: "100%", marginTop: 20}}
        >
          Correct
        </Button>
        <Button 
          onPress={() => this.handleUserAnswer('incorrect')}
          style={{backgroundColor: 'green', padding: 20, marginBottom: 20, width: "100%", marginTop: 20}}
        >
          Incorrect
        </Button>
      </View>
    );
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
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  button: {
    width: '80%',
    backgroundColor: '#BAF5B5',
    borderRadius: 6,
    marginTop: 10,
  },
  TextStyle: {
    color: '#000',
    textAlign: 'center',
    padding: 5,
    fontSize: 18,
  },
  paperFront : {
    marginHorizontal: 15,
    backgroundColor: "white",
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
    padding: 20
  },
  paperBack : {
    top: -310,
    marginHorizontal: 15,
    backgroundColor: "yellow",
    height: 300,
    borderRadius: 5,
    marginBottom: -15,
    padding: 20
  },
  cardTopic: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  cardText: {
    fontSize: 20,
    paddingTop: 8, 
    paddingLeft: 8, 
    color: 'black',
    lineHeight: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = (state, {route}) => {
  const {title} = route.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(QuizView)


