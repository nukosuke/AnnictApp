import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { mdl } from 'react-native-material-kit';

export class LoadingSpinner extends Component {
  render() {
    return (
      <View style={{padding: 64, alignItems: 'center'}}>
        <mdl.Spinner strokeColor='#f85b73' />
      </View>
    );
  }
}
