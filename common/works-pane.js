import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ListView } from 'realm/react-native';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();

export class WorksPane extends Component {
  static propTypes = {
    works: PropTypes.object.isRequired
  }

  render() {
    return (
      <View style={{marginTop: 65}}>
        <View style={{padding: 4}}>
        <TextInput
          style={{height: 30, borderColor: '#e1e1e1', borderWidth: 1}}
          placeholder='キーワードで検索...'
        />
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.props.works}
          renderRow={(rowData) => {
            return (
              <View style={theme.cardStyle}>
                <Text>rowData.title</Text>
              </View>
            );
          }}
        />
        <Text>aaaa</Text>
      </View>
    );
  }
}
