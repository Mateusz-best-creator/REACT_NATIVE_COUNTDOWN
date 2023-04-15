import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../utils/colors';
import {spacing, fontSizes} from '../utils/sizes'

import {RoundedButton} from '../components/roundedButton';

export const Focus = ({ addSubject }) => {

  const [subject, setSubject] = useState(null);
  console.log("subject : ", subject)
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer} >
        <TextInput 
          style={styles.textInput}
          onChangeText={text => setSubject(text)}
          label="What would you like to focus on?" 
        />
        <View>
          <RoundedButton onPress={() => addSubject(subject)} style={styles.button} title="+" size={50} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    justifyContent: 'center',
  }, 
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    display: 'flex',
    justifyContent: 'top',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

