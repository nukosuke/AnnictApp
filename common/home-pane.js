import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, View, ScrollView, Text, Image } from 'react-native';
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
      <View style={{flex:1}}>
        <NavigatorIOS
          barTintColor='#444'
          titleTextColor='#eee'
          initialRoute={{
            component: View,
            title: 'ホーム',
            //pass
          }}
        />

        <Image source={require('../common/Images/annict_logo.png')}
          style={{position: 'absolute', transform: [{scale: 0.3}]}} />

        <ScrollView style={{flex: 1, marginTop: 65}}>
          <View style={{paddingLeft: 8, paddingRight: 8}}>
            <ListView
              enableEmptySections={true}
              dataSource={this.props.records}
              renderRow={(rowData) => {
                return (
                  <View style={{paddingTop: 4, paddingBottom: 4}}>
                    <View style={theme.cardStyle}>
                      <Text style={{paddingHorizontal: 15, paddingTop: 15}}>
                        <Text style={{color: '#f85b73'}}>{rowData.user.name}</Text>
                        <Text style={{color: '#666'}}> が </Text>
                        <Text style={{color: '#f85b73'}}>{rowData.work.title} {rowData.episode.number_text}</Text>
                        <Text style={{color: '#666'}}> を見ました</Text>
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
      </View>
    );
  }
}
