import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

// const sum = require('../utils/Enigma');
//
// test('clears all messages', () => {
//   expect(encipher_clear()).toBe("your secrets are safe");
// });

// // function tests
// test('test api call', () => {
//   expect(getCiphertext()).toBe("VGTNRJXDA");
// });
