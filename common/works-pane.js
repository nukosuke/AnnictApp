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
      <View>
        <View style={{paddingHorizontal: 8, paddingTop: 24, paddingBottom: 8, backgroundColor: '#444'}}>
          <TextInput
            style={{height: 25, borderRadius: 2, borderColor: '#e1e1e1', borderWidth: 1, backgroundColor: '#eee', padding: 4, fontSize: 12}}
            placeholder='キーワードで検索...'
          />
        </View>

        <View style={{marginTop: 65}}>
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
        </View>
      </View>
    );
  }
}
