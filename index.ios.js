/**
 * Annict App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import Realm from 'realm';
import Annict from 'annict';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TabBarIOS
} from 'react-native';

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

import {
  AUTHORIZE_URI,
  CLIENT_ID,
  REDIRECT_URI
} from './common/constants/client-constants'

import {
  HomePane,
  WorksPane,
  SettingsPane,
  ProgramsPane,
  LoginModal,
  RecordModal
} from './common';


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
      title: 'ホーム',
      access_token: null,
      settings: [
        { name: '利用規約' },
        { name: 'ログアウト' },
      ],
      recordModalVisible: false
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
  }

  _renderPane(pane) {
    switch (pane) {
      case 'home':
      default:
        return (<HomePane annict={this.annict} />);

      case 'works':
        return (<WorksPane annict={this.annict} />);

      case 'records':
        return (<HomePane annict={this.annict} records={this.ds.cloneWithRows(this.state.records)} />);

      case 'programs':
        return (<ProgramsPane annict={this.annict} programs={this.ds.cloneWithRows([])} />);

      case 'settings':
        return (<SettingsPane annict={this.annict} settings={this.ds.cloneWithRows(this.state.settings)} />);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
        />

        <LoginModal realm={this.realm} />
        <RecordModal
          visible={this.state.recordModalVisible}
          onCancel={() => {
            this.setState({ recordModalVisible: false });
          }}
        />

        <TabBarIOS
          unselectedTintColor='#666'
          tintColor='#f85b73'
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
            iconName='add-box'
            title='記録'
            onPress={() => {
              this.setState({ recordModalVisible: true });
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
            {this._renderPane('programs')}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName='settings'
            title='設定'
            selected={this.state.selectedTab === 'settings'}
            onPress={() => {
              this.setState({ title: '設定', selectedTab: 'settings' });
            }}
          >
            {this._renderPane('settings')}
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
