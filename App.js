import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import store from './redux_store/storeConfig'
import Constants from 'expo-constants'
import MainNav from './navigation/navigation'



function AppStatusBar({backgroundColor, ...props}) {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} barStyle='dark-content'/>
      </View>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
            <AppStatusBar backgroundColor={'white'} barStyle="light-content"/>
            <MainNav/>
        </NavigationContainer>
      </View>
    </Provider>
  )
}
