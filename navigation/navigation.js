import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import { createStackNavigator } from '@react-navigation/stack';
import DeckView from '../components/DeckView';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { purple, white } from '../utils/colors';
import AddCard from '../components/AddCard';
import QuizView from '../components/QuizView';

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()



const DashBoardTabs = () => (
  <Tabs.Navigator
    initialRouteName="Decks"
    screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === "Decks") {
              icon = (
                <Ionicons name="ios-bookmarks" size={24} color={color} style={{marginBottom: -5}}/>
              );
          } else if (route.name === "Add Deck") {
              icon = (
                <AntDesign name="plussquare" size={24} color={color} style={{marginBottom: -5}}/>
              );
          }
          return icon;
        }
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: purple,
      showIcon: true,
      style: {
          height: 90,
          backgroundColor: white,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
              width: 0,
              height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1,
      }
    }}
  >
    <Tabs.Screen name="Decks" component={DeckList} />
    <Tabs.Screen name="Add Deck" component={AddDeck} />
  </Tabs.Navigator>
)



export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={DashBoardTabs} />
    <Stack.Screen name="Deck View" component={DeckView} options={({route}) => ({
      title: route.params.title
      })} 
    />
    <Stack.Screen name="Add Card" component={AddCard} />
    <Stack.Screen name="Quiz" component={QuizView} />
  </Stack.Navigator>
)