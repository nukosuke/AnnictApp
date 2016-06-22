/**
 * Annict App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import Realm from 'realm';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NavigatorIOS,
  TabBarIOS
} from 'react-native';
import { LoginModal } from './common/login-modal';
import { ListView } from 'realm/react-native';
import { getTheme } from 'react-native-material-kit';
import {
  User,
  Token,
  Work,
  Episode,
  Record,
  RecordList,
} from './common/schema';

import Annict from 'annict';

import {
  AUTHORIZE_URI,
  CLIENT_ID,
  REDIRECT_URI
} from './common/constants/client-constants'



class AnnictApp extends Component {
  constructor(props) {
    super(props);

    this.annict = new Annict();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.realm = new Realm({
      path: 'annict.realm',
      schema: [User, Token, Work, Episode, Record, RecordList]
    });

    this.theme = getTheme();

    this.state = {
      access_token: null,
      records: this.ds.cloneWithRows([]),
    }
  }

  componentWillMount() {
    const token = this.realm.objects('Token')[0];

    if(token) {
      this.state.access_token = token.access_token;
      this.annict.client.setHeader('Authorization', `Bearer ${token.access_token}`);
    }
    else {
      //TODO: set visible authenticate modal by props
      console.log('no token');
    }

    console.log(this.theme.cardStyle);
  }

  componentDidMount() {
    this.annict.Record.get({})
    .then(body => {
      this.setState({ records: this.ds.cloneWithRows(body.records) });
    })
    .catch(err => {
      console.log(err);
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginModal realm={this.realm} />

        <NavigatorIOS
          barTintColor='#333'
          titleTextColor='#eee'
          initialRoute={{
            component: View,
            title: 'Annict',
            //pass
          }}
        />

        <ScrollView style={{flex: 1, marginTop: 65, paddingBottom: 512}}>
          <View style={{paddingLeft: 8, paddingRight: 8}}>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.records}
              renderRow={(rowData) => {
                return (
                  <View style={{paddingTop: 4, paddingBottom: 4}}>
                    <View style={this.theme.cardStyle}>
                      <Text style={{padding: 15}}>
                        {rowData.user.name}
                      </Text>
                      <Text style={this.theme.cardContentStyle}>
                        {rowData.comment}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>

        <TabBarIOS
          unselectedTintColor='#666'
          tintColor='#f51234'
          barTintColor='white'>
          <TabBarIOS.Item
            title='放送予定'>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='記録'>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='作品'>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='records'>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='設定'>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AnnictApp', () => AnnictApp);
