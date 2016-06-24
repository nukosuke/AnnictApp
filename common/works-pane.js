import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
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
        <View style={{height: 64, paddingHorizontal: 10, paddingTop: 28, paddingBottom: 8, backgroundColor: '#444'}}>
          <TextInput
            style={{height: 25, borderRadius: 2, borderColor: '#e1e1e1', borderWidth: 1, backgroundColor: 'white', padding: 4, fontSize: 12}}
            placeholder='キーワードで検索...'
          />
        </View>

        <ScrollableTabView
          tabBarUnderlineColor='#f85b73'
          tabBarActiveTextColor='#f85b73'
        >

          <View tabLabel='見てる'>
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

          <View tabLabel='見たい'>
            <Text>見たい</Text>
          </View>

          <View tabLabel='見た'>
            <Text>見た</Text>
          </View>

          <View tabLabel='中断'>
            <Text>中断</Text>
          </View>

          <View tabLabel='中止'>
            <Text>中止</Text>
          </View>

        </ScrollableTabView>
      </View>
    );
  }
}
