import React from 'react';
import App from '../App';
import { create, renderer } from 'react-test-renderer';
import "isomorphic-fetch";

var testdata1 = '{"ciphertext":"BBPFJ"}';
var testdata2 = '{"ciphertext":"TFXFWC"}';
var testjson1 = JSON.parse(testdata1);
var testjson2 = JSON.parse(testdata2);

// Initial rendering
describe('App renders correctly', () => {
    test('Testing app renders correctly', () => {
      let tree = create(<App />).toJSON()
      expect(tree).toMatchSnapshot();
  })
})

// Button should be visible if plaintext is entered
describe("Enter plaintext, see button", () => {

    test('Encipher button is visible', () => {
      let tree = create(<App />);
      let instance = tree.getInstance();

      // initial button state is not visible
      expect(instance.state.buttonVisible).toBe(false)

      // enter paintext
      instance.handlePlaintextInput();

      // button should now be visible
      expect(instance.state.buttonVisible).toBe(true);

      // snapshot test
      expect(tree.toJSON()).toMatchSnapshot()
    })
})

// Change rotors
describe("Change rotors", () => {

    test('New rotors are seen', () => {
      let tree = create(<App />);
      let instance = tree.getInstance();

      // initial button state
      expect(instance.state.rotor1).toBe('1')
      expect(instance.state.rotor2).toBe('2')
      expect(instance.state.rotor3).toBe('3')

      // Change rotor positions
      instance.handleRotor1('5');
      instance.handleRotor2('4');
      instance.handleRotor3('1');

      // New rotor positions shall now be shown
      expect(instance.state.rotor1).toBe('5')
      expect(instance.state.rotor2).toBe('4')
      expect(instance.state.rotor3).toBe('1')

      // snapshot test
      expect(tree.toJSON()).toMatchSnapshot()
    })
})

// Change rotor start positions
describe("Change rotor start positions", () => {

    test('New rotor start positions are seen', () => {
      let tree = create(<App />);
      let instance = tree.getInstance();

      // initial button state
      expect(instance.state.start1).toBe('A')
      expect(instance.state.start2).toBe('M')
      expect(instance.state.start3).toBe('C')

      // Change start positions
      instance.handleStart1('M');
      instance.handleStart2('T');
      instance.handleStart3('W');

      // New rotor positions shall now be shown
      expect(instance.state.start1).toBe('M')
      expect(instance.state.start2).toBe('T')
      expect(instance.state.start3).toBe('W')

      // snapshot test
      expect(tree.toJSON()).toMatchSnapshot()
    })
})

// Encipher plaintext
describe("Encipher plaintext", () => {

    test('Enter plaintext and encipher, enciphered text is seen', async () => {
      let tree = create(<App />);
      let instance = tree.getInstance();

      // initial state
      expect(instance.state.rotor1).toBe('1')
      expect(instance.state.rotor2).toBe('2')
      expect(instance.state.rotor3).toBe('3')
      expect(instance.state.start1).toBe('A')
      expect(instance.state.start2).toBe('M')
      expect(instance.state.start3).toBe('C')
      expect(instance.state.plaintext).toBe(null)
      expect(instance.state.ciphertext).toBe(null)

      // Enter plaintext
      instance.handlePlaintextInput('Hello');

      // New rotor positions shall now be shown
      expect(instance.state.plaintext).toBe('Hello')
      expect(instance.state.ciphertext).toBe(null)

      // mock encipher
      instance.handleEncipher(testjson1);

      // check ciphertext
      expect(instance.state.plaintext).toBe('Hello')
      expect(instance.state.ciphertext).toBe('BBPFJ')

      // snapshot test
      expect(tree.toJSON()).toMatchSnapshot()
    })
})

// Change rotor positions and encipher plaintext
describe("Change machine setup and encipher plaintext", () => {

    test('Change machine setup, enter plaintext and encipher, enciphered text is seen', () => {
      let tree = create(<App />);
      let instance = tree.getInstance();

      // initial state
      expect(instance.state.rotor1).toBe('1')
      expect(instance.state.rotor2).toBe('2')
      expect(instance.state.rotor3).toBe('3')
      expect(instance.state.start1).toBe('A')
      expect(instance.state.start2).toBe('M')
      expect(instance.state.start3).toBe('C')
      expect(instance.state.plaintext).toBe(null)
      expect(instance.state.ciphertext).toBe(null)

      // Change start positions and enter plaintext
      instance.handleRotor1('5');
      instance.handleRotor2('4');
      instance.handleRotor3('1');
      instance.handleStart1('Z');
      instance.handleStart2('X');
      instance.handleStart3('Y');
      instance.handlePlaintextInput('yellow');

      // Ciphertext is not shown yet
      expect(instance.state.ciphertext).toBe(null)

      // Click encipher button
      instance.handleEncipher(testjson2);

      // Check state after encipherment
      expect(instance.state.rotor1).toBe('5')
      expect(instance.state.rotor2).toBe('4')
      expect(instance.state.rotor3).toBe('1')
      expect(instance.state.start1).toBe('Z')
      expect(instance.state.start2).toBe('X')
      expect(instance.state.start3).toBe('Y')
      expect(instance.state.plaintext).toBe('yellow')
      expect(instance.state.ciphertext).toBe('TFXFWC')

      // snapshot test
      expect(tree.toJSON()).toMatchSnapshot()
    })
})
