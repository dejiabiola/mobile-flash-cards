import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button';
import { mainColor, white, blue, lightGreen, darkerPurple } from '../utils/colors';

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
    if ((this.state.cardView === true) && (this.state.index !== this.props.deck.questions.length - 1)) {
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


  handleResetQuiz = () => {
    if (this.state.cardView === true) {
      this.flip_Animation()
      this.setState((oldState) => ({
        cardView: !oldState.cardView
      }))
    }

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
        <View style={styles.completedContainer}>
          <View style={styles.textWrapper}>
            <Text style={[styles.completedText, {textAlign: 'center'}]}>Congratulations, you have answered all the questions in this deck</Text>
            <Text style={styles.completedText}>You scored</Text>
            <Text style={[styles.completedText, styles.finalScore]}>{correct} out of {deck.questions.length}</Text>
          </View>
          <Button
            style={{backgroundColor: blue, padding: 20, marginBottom: 20, width: 300, marginTop: 20, borderRadius: 10}}
            onPress={this.handleResetQuiz}
          >
            Restart Quiz
          </Button>
          <Button
            onPress={() => {
              this.handleResetQuiz
              this.props.navigation.goBack()
            }}
            style={{backgroundColor: lightGreen, padding: 20, marginBottom: 20, width: 300, marginTop: 20, borderRadius: 10}}
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
                
                <View style={{width: 350, marginBottom: -300}}>
                  <View style={{alignItems: 'flex-start', marginBottom: 10, marginLeft: 10}}>
                    <Text style={{fontSize: 20}}>{index + 1} / {deck.questions.length}</Text>
                  </View>
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
          <Text style={styles.textStyle}>{cardView === false ? 'Show Answer' : 'Show Question'}</Text>
        </TouchableOpacity>
        <Button 
          onPress={() => this.handleUserAnswer('correct')}
          style={{backgroundColor: blue, padding: 20, marginBottom: 15, width: 320, marginTop: 12, borderRadius: 10}}
        >
          Correct
        </Button>
        <Button 
          onPress={() => this.handleUserAnswer('incorrect')}
          style={{backgroundColor: '#F00F60', padding: 20, marginBottom: 15, width: 320, marginTop: 12, borderRadius: 10}}
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
    padding: 20,
    backgroundColor: mainColor
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainColor
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: mainColor
  },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: mainColor
  },
  completedText: {
    marginBottom: 30,
    fontSize: 20,
    textAlign: 'center',
    color: white,
  },
  finalScore: {
    fontSize: 50
  },  
  textWrapper: {
    width: 300,
    height: 300,
    backgroundColor: '#920DF2',
    padding: 20,
    borderRadius: 20
  },
  button: {
    borderRadius: 6,
    padding: 10
  },
  textStyle: {
    color: darkerPurple,
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
    padding: 20,
    backgroundColor: '#2CC5D3'
  },
  paperBack : {
    top: -310,
    marginHorizontal: 15,
    backgroundColor: "#DA7325",
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
    fontSize: 25,
    paddingTop: 8, 
    paddingLeft: 8, 
    color: 'black',
    lineHeight: 30,
    textAlign: 'center',
  }
})

const mapStateToProps = (state, {route}) => {
  const {title} = route.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(QuizView)


