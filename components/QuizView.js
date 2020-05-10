import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class QuizView extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }
  flip_Animation = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
      }).start();
    }
  };

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
        <View style={{width: 350, marginBottom: -200}}>
          <Animated.View style={[frontAnimatedStyle, styles.paperFront,{elevation: this.elevationFront}, {opacity: this.frontOpacity}]}>
            <Text style={{fontSize: 20,paddingTop: 8, paddingLeft: 8, color: 'black',lineHeight: 20}}>
              Here is the question
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.paperBack, {elevation: this.elevationBack}, {opacity: this.backOpacity}]}>
            <Text style={{fontSize: 20,paddingTop: 8, paddingLeft: 8, color: 'black',lineHeight: 20}}>Here is the answer</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.flip_Animation}>
          <Text style={styles.TextStyle}> Click Here To Flip The Image </Text>
        </TouchableOpacity>
      </View>
    );
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
  
  },
  paperBack : {
    top: -310,
    marginHorizontal: 15,
    backgroundColor: "white",
    height: 300,
    borderRadius: 5,
    marginBottom: -15,
  }
})



export default connect(mapStateToProps)(QuizView)


