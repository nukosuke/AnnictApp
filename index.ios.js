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
  NavigatorIOS,
  Image,
  TabBarIOS
} from 'react-native';
import { LoginModal } from './common/login-modal';
import { ListView } from 'realm/react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

import { WorksPane } from './common/works-pane';
import { HomePane } from './common/home-pane';


class AnnictApp extends Component {
  constructor(props) {
    super(props);

    this.annict = new Annict();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.realm = new Realm({
      path: 'annict.realm',
      schema: [User, Token, Work, Episode, Record, RecordList]
    });

    this.state = {
      selectedTab: 'home',
      access_token: null,
      records: [],
      works: [],
    }
  }

  componentDidMount() {
    this.annict.Record.get({})
    .then(body => {
      this.setState({ records: body.records });
    })
    .catch(err => {
      console.log(err);
    })
    .done();
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
  }

  _renderPane(pane) {
    switch (pane) {
      case 'home':
      default:
        return (<HomePane annict={this.annict} records={this.ds.cloneWithRows(this.state.records)} />);

      case 'works':
        return (<WorksPane annict={this.annict} works={this.ds.cloneWithRows(this.state.works)} />);

      case 'records':
        return (<HomePane annict={this.annict} records={this.ds.cloneWithRows(this.state.records)} />);

      case 'programs':
        return (<HomePane annict={this.annict} records={this.ds.cloneWithRows(this.state.records)} />);

      case 'settings':
        return (<HomePane annict={this.annict} records={this.ds.cloneWithRows(this.state.records)} />);
    }
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
            title: 'ホーム',
            //pass
          }}
        />

        <Image source={require('./common/Images/annict_logo.png')}
          style={{position: 'absolute', transform: [{scale: 0.3}]}} />


        <TabBarIOS
          unselectedTintColor='#666'
          tintColor='#f51234'
          barTintColor='white'>
          <Icon.TabBarItemIOS
            iconName='home'
            title='ホーム'
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              this.setState({ selectedTab: 'home' });
            }}
          >
            {this._renderPane('home')}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName='movie'
            title='作品'
            selected={this.state.selectedTab === 'works'}
            onPress={() => {
              this.setState({ selectedTab: 'works' });
            }}
          >
            {this._renderPane('works')}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName='add'
            title='記録'
            selected={this.state.selectedTab === 'records'}
            onPress={() => {
              this.setState({ selectedTab: 'records' });
            }}
          >
            {this._renderPane('works')}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName='event'
            title='放送予定'
            selected={this.state.selectedTab === 'programs'}
            onPress={() => {
              this.setState({ selectedTab: 'programs' });
            }}
          >
            {this._renderPane('works')}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName='settings'
            title='設定'
            selected={this.state.selectedTab === 'settings'}
            onPress={() => {
              this.setState({ selectedTab: 'settings' });
            }}
          >
            {this._renderPane('works')}
          </Icon.TabBarItemIOS>
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
