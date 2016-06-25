import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, View } from 'react-native';
import { ListView } from 'realm/react-native';

export class ProgramsPane extends Component {
  render() {
    return (
      <View>
        <NavigatorIOS
          barTintColor='#444'
          titleTextColor='#eee'
          initialRoute={{
            component: View,
            title: '放送予定',
            //pass
          }}
        />

      </View>
    );
  }
}
