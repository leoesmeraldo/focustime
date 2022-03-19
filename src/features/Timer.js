import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { useKeepAwake} from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown'
import { RoundedButton } from '../components/Button'
import { colors } from '../utils/colors'
import { spacing, fontSizes } from '../utils/sizes'

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ( {passSubject, clearSubject, onTimerEnds }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.05);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnds();
  }
  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Countdown
          minutes={minutes} 
          isPaused={!isStarted} 
          onProgress={setProgress} 
          onEnd={onEnd} 
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.text}>{passSubject.toUpperCase()}</Text>
        </View>
      </View>
      
      <ProgressBar 
        progress={progress}
        color={colors.progressBar}
        style={{height: spacing.sm}}
      />
      <View style={styles.controls}>
        <RoundedButton title="1" size={75} onPress={() => setMinutes(1)}/>
        <RoundedButton title="5" size={75} onPress={() => setMinutes(5)}/>
        <RoundedButton title="10" size={75} onPress={() => setMinutes(10)}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (<RoundedButton title="Start" onPress={() => setIsStarted(true)}/>) : (<RoundedButton title="Pause" onPress={() => setIsStarted(false)}/>)}
      </View>
      <View style={styles.controls}>
        <RoundedButton title="-" size={50} onPress={clearSubject}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  timer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold'
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.xl
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg
  },
  controls: {
    flexDirection: 'row',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})
