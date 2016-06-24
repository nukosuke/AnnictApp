import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
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
