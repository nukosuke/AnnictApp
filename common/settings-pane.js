import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { ListView } from 'realm/react-native';

export class SettingsPane extends Component {
  render() {
    return (
      <View style={{flex: 1, paddingTop: 65}}>
        <ListView
          dataSource={this.props.settings}
          renderRow={rowData => {
            return (
              <View style={{paddingLeft: 16}}>
                <Text>{rowData.name}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
