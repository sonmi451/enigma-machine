import React from 'react';
import { Button, Text, TextInput, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Rotors from './components/Rotors';
import { backgrounds } from './utils/Background';
import { alphabet } from './utils/Alphabet';
import { rotorNumbers } from './utils/Numbers';

export default class App extends React.Component {
  state = {
      loading: true,
      loadingText: 'Booting Enigma Machine',
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

  componentWillMount(){
    const testApiCall = `http://aishamclean.co.uk/enigma/encipher/1/2/3/A/M/C/hello`
    fetch(testApiCall)
    .then(response => response.json())
    .then(data => {
          this.setState({
              loading: false,
          })
      })
    .catch( err => {
      this.setState({
          loadingText: 'Trouble booting enigma machine, check your internet connection',
      })
    });
  }

  getCiphertext() {
      const api = `http://aishamclean.co.uk/enigma/encipher/${this.state.rotor1}/${this.state.rotor2}/${this.state.rotor3}/${this.state.start1}/${this.state.start2}/${this.state.start3}/${this.state.plaintext.replace(/[^A-Z]/g, '')}`
      fetch(api)
      .then(response => response.json())
      .then( data => this.handleEncipher(data) )
      .catch( err => {
        console.log(api + ' request returned you an error there')
      });
  }

  handleEncipher(data) {
    console.log(data),
    this.setState({
        ciphertext: data.ciphertext,
        backgroundKey: data.ciphertext.substr(0, 1),
    })
  }


  handleRotor1(rotor1) {
    this.setState({
      rotor1: rotor1,
    })
  }

  handleRotor2(rotor2) {
    this.setState({
      rotor2: rotor2,
    })
  }

  handleRotor3(rotor3) {
    this.setState({
      rotor3: rotor3,
    })
  }

  handleStart1(start1) {
    this.setState({
      start1: start1,
    })
  }

  handleStart2(start2) {
    this.setState({
      start2: start2,
    })
  }

  handleStart3(start3) {
    this.setState({
      start3: start3,
    })
  }

  handlePlaintextInput(plaintext) {
    this.setState({
      plaintext: plaintext,
      buttonVisible: true,
    })
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
      <Picker
          placeholder={placeholderRotor}
          items={rotorNumbers}
          onValueChange={ (value) => this.handleRotor1(value) }
          value={this.state.rotor1}
          // useNativeAndroidPickerStyle={false}
        />
    )

    const RotorB = (
      <Picker
          placeholder={placeholderRotor}
          items={rotorNumbers}
          onValueChange={ (value) => this.handleRotor2(value) }
          value={this.state.rotor2}
          // useNativeAndroidPickerStyle={false}
        />
    )

    const RotorC = (
      <Picker
          placeholder={placeholderRotor}
          items={rotorNumbers}
          onValueChange={ (value) => this.handleRotor3(value) }
          value={this.state.rotor3}
          // useNativeAndroidPickerStyle={false}
        />
    )

    const Rotor1 = (
      <Picker
          placeholder={placeholderRotor}
          items={alphabet}
          onValueChange={ (value) => this.handleStart1(value) }
          value={this.state.start1}
          // useNativeAndroidPickerStyle={false}
        />
    )

    const Rotor2 = (
      <Picker
          placeholder={placeholderRotor}
          items={alphabet}
          onValueChange={ (value) => this.handleStart2(value) }
          value={this.state.start2}
          // useNativeAndroidPickerStyle={false}
        />
    )

    const Rotor3 = (
      <Picker
          placeholder={placeholderRotor}
          items={alphabet}
          onValueChange={ (value) => this.handleStart3(value) }
          value={this.state.start3}
          // useNativeAndroidPickerStyle={false}
        />
    )

    const showButton = this.state.buttonVisible

    const placeholderRotor = {
          label: 'Select Rotor Position',
          value: null,
          color: 'black',
        };

    const showLoadingText = this.state.loading

    const loadingScreen = <Text style={styles.ciphertext}>{this.state.loadingText}</Text>

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
            style={styles.plaintext}
            placeholderTextColor={'black'}
            autoCapitalize='characters'
            onChangeText={ (plaintext) => this.handlePlaintextInput(plaintext) }
            placeholder={this.state.message}
            maxLength = {50} />

        </View>

        { showButton ? encipherButton : null }

          <View style={styles.outputContainer}>

          { showLoadingText ? loadingScreen :
            <Text selectable style={styles.ciphertext}>{this.state.ciphertext}</ Text>
          }

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
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  outputContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titletext: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
  },
  plaintext: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  ciphertext: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
});
