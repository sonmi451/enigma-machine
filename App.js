import React from 'react';
import { Button, Text, TextInput, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Rotors from './components/Rotors';
import { backgrounds } from './utils/Background';
import { alphabet } from './utils/Alphabet';
import { rotorNumbers } from './utils/Numbers';

export default class App extends React.Component {
  state = {
      isLoading: false,
      buttonVisible: false,
      rotor1: '1',
      rotor2: '2',
      rotor3: '3',
      start1: 'A',
      start2: 'M',
      start3: 'C',
      message: 'PLAINTEXT',
      plaintext: null,
      ciphertext: null,
      backgroundKey: 'Default',
  };

  getCiphertext() {
      const api = `http://aishamclean.co.uk/enigma/encipher/${this.state.rotor1}/${this.state.rotor2}/${this.state.rotor3}/${this.state.start1}/${this.state.start2}/${this.state.start3}/${this.state.plaintext.replace(/[^A-Z]/g, '')}`
      console.log(api)
      fetch(api)
      .then(response => response.json())
      .then(data => {
            this.setState({
                ciphertext: data.ciphertext,
                backgroundKey: data.ciphertext.substr(0, 1),
            })
        })
      .catch( err => {
        console.log(api + ' request returned you an error there')
      });
  }

  render() {

    const encipherButton = (
      <Button
          onPress={ this.getCiphertext.bind(this) }
          title='Encipher'
          color='black'
          accessibilityLabel='Click here to encipher your message'
        />
    )

    const RotorA = (
      <RNPickerSelect
          placeholder={placeholderRotor}
          items={rotorNumbers}
          onValueChange={value => {
            this.setState({
              rotor1: value,
            });
          }}
          value={this.state.rotor1}
          useNativeAndroidPickerStyle={false}
        />
    )

    const RotorB = (
      <RNPickerSelect
          placeholder={placeholderRotor}
          items={rotorNumbers}
          onValueChange={value => {
            this.setState({
              rotor2: value,
            });
          }}
          value={this.state.rotor2}
          useNativeAndroidPickerStyle={false}
        />
    )

    const RotorC = (
      <RNPickerSelect
          placeholder={placeholderRotor}
          items={rotorNumbers}
          onValueChange={value => {
            this.setState({
              rotor3: value,
            });
          }}
          value={this.state.rotor3}
          useNativeAndroidPickerStyle={false}
        />
    )

    const Rotor1 = (
      <RNPickerSelect
          placeholder={placeholderRotor}
          items={alphabet}
          onValueChange={value => {
            this.setState({
              start1: value,
            });
          }}
          value={this.state.start1}
          useNativeAndroidPickerStyle={false}
        />
    )

    const Rotor2 = (
      <RNPickerSelect
          placeholder={placeholderRotor}
          items={alphabet}
          onValueChange={value => {
            this.setState({
              start2: value,
            });
          }}
          value={this.state.start2}
          useNativeAndroidPickerStyle={false}
        />
    )

    const Rotor3 = (
      <RNPickerSelect
          placeholder={placeholderRotor}
          items={alphabet}
          onValueChange={value => {
            this.setState({
              start3: value,
            });
          }}
          value={this.state.start3}
          useNativeAndroidPickerStyle={false}
        />
    )

    const showButton = this.state.buttonVisible

    const placeholderRotor = {
          label: 'Select Rotor Position',
          value: null,
          color: 'black',
        };

    return (
      <View style={[
        styles.screenContainer,
        {
          backgroundColor: backgrounds[this.state.backgroundKey].color
        }
        ]}>

        <View style={styles.inputContainer}>

          <Text style={[styles.titletext,
              {
                color: "#" + this.state.rotor1 + this.state.rotor2 + this.state.rotor3
              }
              ]}>
          Select your rotor start positions and then enter your message.
          </Text>

          <Rotors style={styles.rotorContainer} rotor1={RotorA} rotor2={RotorB} rotor3={RotorC}/>

          <Rotors style={styles.rotorContainer} rotor1={Rotor1} rotor2={Rotor2} rotor3={Rotor3}/>

          <TextInput
            autoCapitalize='characters'
            onChangeText={ plaintext =>
              this.setState({
                plaintext,
                buttonVisible: true,
              })
          }
            placeholder={this.state.message}
            maxLength = {50} />

        </View>

          { showButton ? encipherButton : null }

        <View style={styles.outputContainer}>
          <Text style={styles.ciphertext}>{this.state.ciphertext}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rotorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  outputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titletext: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
  },
  ciphertext: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
});
