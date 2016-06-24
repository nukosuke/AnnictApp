import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ListView } from 'realm/react-native';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();

export class HomePane extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ScrollView style={{flex: 1, marginTop: 65}}>
        <View style={{paddingLeft: 8, paddingRight: 8}}>
          <ListView
            enableEmptySections={true}
            dataSource={this.props.records}
            renderRow={(rowData) => {
              return (
                <View style={{paddingTop: 4, paddingBottom: 4}}>
                  <View style={theme.cardStyle}>
                    <Text style={{padding: 15}}>
                      {rowData.user.name}
                    </Text>
                    <Text style={theme.cardContentStyle}>
                      {rowData.comment}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
