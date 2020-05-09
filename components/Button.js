import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'


export default function Button({ onPress, children, style, disabled }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: white,
    textAlign: 'center'
  },
})