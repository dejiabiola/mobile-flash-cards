import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from '../components/DeckList';
import AddDeckScreen from '../components/AddDeck';
import { createStackNavigator } from '@react-navigation/stack';
import DeckView from '../components/DeckView';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { purple, white } from '../utils/colors';
import AddCardScreen from '../components/AddCard';
import QuizView from '../components/QuizView';

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()



const DashBoardTabs = () => (
  <Tabs.Navigator
    initialRouteName="All Decks"
    screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === "All Decks") {
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
    <Tabs.Screen name="All Decks" component={DeckList} />
    <Tabs.Screen name="Add Deck" component={AddDeckScreen} />
  </Tabs.Navigator>
)

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'All Decks';

  switch (routeName) {
    case 'All Decks':
      return 'All Decks';
    case 'Add Deck':
      return 'Add Deck';
  }
}



export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={DashBoardTabs}
      options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
      })}
    />
    <Stack.Screen name="Deck View" component={DeckView} options={({route}) => ({
      title: route.params.title
      })} 
    />
    <Stack.Screen name="Add Card" component={AddCardScreen} options={({route}) => ({
      title: "Add Card to " + route.params.title + " Deck"
      })} />
    <Stack.Screen name="Quiz" component={QuizView} options={({route}) => ({
      title: route.params.title + " Quiz"
      })} />
  </Stack.Navigator>
)