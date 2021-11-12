import React from 'react';
import { Button, Text, TextInput, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Rotors from './src/components/Rotors';
import { backgrounds } from './src/utils/Background';
import { alphabet } from './src/utils/Alphabet';
import { rotorNumbers } from './src/utils/Numbers';

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
      rotorNums: rotorNumbers,
      rotorLetters: alphabet
  };

  componentWillMount(){
    const testApiCall = `https://aishamclean.co.uk/enigma/encipher/?rotor1=4&rotor2=5&rotor3=1&position1=A&position2=M&position3=C&plaintext=HELLO`
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
      const api = `https://aishamclean.co.uk/enigma/encipher/?rotor1=${this.state.rotor1}&rotor2=${this.state.rotor2}&rotor3=${this.state.rotor3}&position1=${this.state.start1}&position2=${this.state.start2}&position3=${this.state.start3}&plaintext=${this.state.plaintext.replace(/[^a-zA-Z]/g, '')}`
      fetch(api)
      .then(response => response.json())
      .then( data => this.handleEncipher(data) )
      .catch( err => {
        console.log(api + ' request returned you an error there:' + err)
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
          selectedValue={placeholderRotor}
          onValueChange={ (value) => this.handleRotor1(value) }
          value={this.state.rotor1}
          mode='dropdown' // Android only
        >
        <Picker.Item label='I' value='1' />
        <Picker.Item label='II' label='2' />
        <Picker.Item label='III' label='3' />
        <Picker.Item label='IV' label='4' />
        <Picker.Item label='V' label='5' />
      </Picker>
    )

    const RotorB = (
      <Picker
          selectedValue={placeholderRotor}
          onValueChange={ (value) => this.handleRotor2(value) }
          value={this.state.rotor2}
          mode='dropdown' // Android only
        >
        <Picker.Item label='I' value='1' />
        <Picker.Item label='II' label='2' />
        <Picker.Item label='III' label='3' />
        <Picker.Item label='IV' label='4' />
        <Picker.Item label='V' label='5' />
      </Picker>
    )

    const RotorC = (
      <Picker
          selectedValue={placeholderRotor}
          onValueChange={ (value) => this.handleRotor3(value) }
          value={this.state.rotor3}
          mode='dropdown' // Android only
        >
        <Picker.Item label='I' value='1' />
        <Picker.Item label='II' label='2' />
        <Picker.Item label='III' label='3' />
        <Picker.Item label='IV' label='4' />
        <Picker.Item label='V' label='5' />
      </Picker>
    )

    const Rotor1 = (
      <Picker
          selectedValue={placeholderRotor}
          onValueChange={ (value) => this.handleStart1(value) }
          value={this.state.start1}
          mode='dropdown' // Android only
        >
        <Picker.Item label='A' value='A' />
        <Picker.Item label='B' value='B' />
        <Picker.Item label='C' value='C' />
        <Picker.Item label='D' value='D' />
        <Picker.Item label='E' value='E' />
        <Picker.Item label='F' value='F' />
      </Picker>
    )

    const Rotor2 = (
      <Picker
          selectedValue={placeholderRotor}
          onValueChange={ (value) => this.handleStart2(value) }
          value={this.state.start2}
          mode='dropdown' // Android only
        >
        <Picker.Item label='A' value='A' />
        <Picker.Item label='B' value='B' />
        <Picker.Item label='C' value='C' />
        <Picker.Item label='D' value='D' />
        <Picker.Item label='E' value='E' />
        <Picker.Item label='F' value='F' />
      </Picker>
    )

    const Rotor3 = (
      <Picker
          selectedValue={placeholderRotor}
          onValueChange={ (value) => this.handleStart3(value) }
          value={this.state.start3}
          mode='dropdown' // Android only
        >
        <Picker.Item label='A' value='A' />
        <Picker.Item label='B' value='B' />
        <Picker.Item label='C' value='C' />
        <Picker.Item label='D' value='D' />
        <Picker.Item label='E' value='E' />
        <Picker.Item label='F' value='F' />
      </Picker>
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
                color: '#' + this.state.rotor1 + this.state.rotor2 + this.state.rotor3
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
            selectedValue={this.state.message}
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
