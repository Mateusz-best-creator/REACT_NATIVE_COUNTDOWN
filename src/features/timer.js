import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import {spacing} from '../utils/sizes'
import { ProgressBar, Text } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { RoundedButton } from '../components/roundedButton';
import { Countdown } from '../components/countdown';
import {Timing} from './timing';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (resetFunction) => {
    Vibration.vibrate(PATTERN);
    setStarted(false);
    setProgress(1);
    resetFunction();
    onTimerEnd(focusSubject);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={(value) => setProgress(value / 100)}
          onEnd={onEnd}
        />
        <View style={{ padding: 50 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper({ flex: 0.3 })}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252250',
    flex: 1,
  },
  countdown: {
    paddingTop: 10,
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    display: 'flex',
    flexDirection: 'row',
  },  
  title: { color: 'white', textAlign: 'center' },
  task: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  buttonWrapper: ({
    flex = 0.3,
    padding = 15,
    justifyContent = 'center',
  } = {}) => ({
    flex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent,
    padding,
  }),
  clearSubjectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
