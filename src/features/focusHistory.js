import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {colors} from '../utils/colors';
import {fontSizes} from '../utils/sizes';
import {spacing} from '../utils/sizes'

export const FocusHistory = ({ history }) => {

  if (!history || !history.length) return <Text style={styles.title}>We haven't focused on anything.</Text>;

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;
  console.log("histiry : ", history)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList data={history} renderItem={renderItem}></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    fontsize: fontSizes.md,
    color: colors.white,
    paddingTop: spacing.sm,
  },  
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    padding: spacing.md,
    fontWeight: 'bold',
  }
})