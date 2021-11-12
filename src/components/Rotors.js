import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

const Rotors = ({style,rotor1,rotor2,rotor3}) => {
  return (
    <View style={style}>
      {rotor1}
      {rotor2}
      {rotor3}
    </View>
);
};

export default Rotors;
