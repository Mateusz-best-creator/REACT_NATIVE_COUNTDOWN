import React, {useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

// components
import {colors} from './src/utils/colors';
import {Focus} from './src/features/focus.js';
import {Timer} from './src/features/timer';
import {FocusHistory} from './src/features/focusHistory';

export default function App() {

  const [currentSubject, setCurrentSubject] = useState(null);
  const [itemsHistory, setItemsHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {
        !currentSubject 
        ? <>
          <Focus addSubject={value => setCurrentSubject(value)} />
          <FocusHistory history={itemsHistory} />
        </>
        : <Timer 
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setItemsHistory([...itemsHistory, subject])
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
