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
      backgroundKey: 'Default'
  };

  componentDidMount(){
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
      <View style={styles.rotor}>
      <Picker
          selectedValue={this.state.rotor1}
          onValueChange={ (value) => this.handleRotor1(value) }
          mode='dropdown' // Android only
        >
        <Picker.Item label='I' value='1' />
        <Picker.Item label='II' value='2' />
        <Picker.Item label='III' value='3' />
        <Picker.Item label='IV' value='4' />
        <Picker.Item label='V' value='5' />
      </Picker>
      </View>
    )

    const RotorB = (
      <View style={styles.rotor}>
      <Picker
          selectedValue={this.state.rotor2}
          onValueChange={ (value) => this.handleRotor2(value) }
          mode='dropdown' // Android only
        >
        <Picker.Item label='I' value='1' />
        <Picker.Item label='II' value='2' />
        <Picker.Item label='III' value='3' />
        <Picker.Item label='IV' value='4' />
        <Picker.Item label='V' value='5' />
      </Picker>
      </View>
    )

    const RotorC = (
      <View style={styles.rotor}>
      <Picker
          selectedValue={this.state.rotor3}
          onValueChange={ (value) => this.handleRotor3(value) }
          mode='dropdown' // Android only
        >
        <Picker.Item label='I' value='1' />
        <Picker.Item label='II' value='2' />
        <Picker.Item label='III' value='3' />
        <Picker.Item label='IV' value='4' />
        <Picker.Item label='V' value='5' />
      </Picker>
      </View>
    )

    const Rotor1 = (
      <View style={styles.rotor}>
      <Picker
          selectedValue={this.state.start1}
          onValueChange={ (value) => this.handleStart1(value) }
          mode='dropdown' // Android only
        >
        <Picker.Item label='A' value='A' />
        <Picker.Item label='B' value='B' />
        <Picker.Item label='C' value='C' />
        <Picker.Item label='D' value='D' />
        <Picker.Item label='E' value='E' />
        <Picker.Item label='F' value='F' />
        <Picker.Item label='G' value='G' />
        <Picker.Item label='H' value='H' />
        <Picker.Item label='I' value='I' />
        <Picker.Item label='J' value='J' />
        <Picker.Item label='K' value='K' />
        <Picker.Item label='L' value='L' />
        <Picker.Item label='M' value='M' />
        <Picker.Item label='N' value='N' />
        <Picker.Item label='O' value='O' />
        <Picker.Item label='P' value='P' />
        <Picker.Item label='Q' value='Q' />
        <Picker.Item label='R' value='R' />
        <Picker.Item label='S' value='S' />
        <Picker.Item label='T' value='T' />
        <Picker.Item label='U' value='U' />
        <Picker.Item label='V' value='V' />
        <Picker.Item label='W' value='W' />
        <Picker.Item label='X' value='X' />
        <Picker.Item label='Y' value='Y' />
        <Picker.Item label='Z' value='Z' />
      </Picker>
      </View>
    )

    const Rotor2 = (
      <View style={styles.rotor}>
      <Picker
          selectedValue={this.state.start2}
          onValueChange={ (value) => this.handleStart2(value) }
          mode='dropdown' // Android only
        >
        <Picker.Item label='A' value='A' />
        <Picker.Item label='B' value='B' />
        <Picker.Item label='C' value='C' />
        <Picker.Item label='D' value='D' />
        <Picker.Item label='E' value='E' />
        <Picker.Item label='F' value='F' />
        <Picker.Item label='G' value='G' />
        <Picker.Item label='H' value='H' />
        <Picker.Item label='I' value='I' />
        <Picker.Item label='J' value='J' />
        <Picker.Item label='K' value='K' />
        <Picker.Item label='L' value='L' />
        <Picker.Item label='M' value='M' />
        <Picker.Item label='N' value='N' />
        <Picker.Item label='O' value='O' />
        <Picker.Item label='P' value='P' />
        <Picker.Item label='Q' value='Q' />
        <Picker.Item label='R' value='R' />
        <Picker.Item label='S' value='S' />
        <Picker.Item label='T' value='T' />
        <Picker.Item label='U' value='U' />
        <Picker.Item label='V' value='V' />
        <Picker.Item label='W' value='W' />
        <Picker.Item label='X' value='X' />
        <Picker.Item label='Y' value='Y' />
        <Picker.Item label='Z' value='Z' />
      </Picker>
      </View>
    )

    const Rotor3 = (
      <View style={styles.rotor}>
      <Picker
          selectedValue={this.state.start3}
          onValueChange={ (value) => this.handleStart3(value) }
          mode='dropdown' // Android only
        >
        <Picker.Item label='A' value='A' />
        <Picker.Item label='B' value='B' />
        <Picker.Item label='C' value='C' />
        <Picker.Item label='D' value='D' />
        <Picker.Item label='E' value='E' />
        <Picker.Item label='F' value='F' />
        <Picker.Item label='G' value='G' />
        <Picker.Item label='H' value='H' />
        <Picker.Item label='I' value='I' />
        <Picker.Item label='J' value='J' />
        <Picker.Item label='K' value='K' />
        <Picker.Item label='L' value='L' />
        <Picker.Item label='M' value='M' />
        <Picker.Item label='N' value='N' />
        <Picker.Item label='O' value='O' />
        <Picker.Item label='P' value='P' />
        <Picker.Item label='Q' value='Q' />
        <Picker.Item label='R' value='R' />
        <Picker.Item label='S' value='S' />
        <Picker.Item label='T' value='T' />
        <Picker.Item label='U' value='U' />
        <Picker.Item label='V' value='V' />
        <Picker.Item label='W' value='W' />
        <Picker.Item label='X' value='X' />
        <Picker.Item label='Y' value='Y' />
        <Picker.Item label='Z' value='Z' />
      </Picker>
      </View>
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

        </View>

        <View>
          <TextInput
            style={styles.plaintext}
            placeholderTextColor={'black'}
            autoCapitalize='characters'
            onChangeText={ (plaintext) => this.handlePlaintextInput(plaintext) }
            defaultValue={this.state.message}
            placeholder="Type your message here!"
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
  rotor: {
      flex: 1
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
    textAlign: 'center',
    height: 60
  },
  ciphertext: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
});
