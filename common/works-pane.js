import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ListView } from 'realm/react-native';
import { getTheme, mdl } from 'react-native-material-kit';
import { LoadingSpinner } from './components';

const theme = getTheme();

const status = [
  { label: '見てる', param: 'watching' },
  { label: '見たい', param: 'wanna_watch' },
  { label: '見た', param: 'watched' },
  { label: '中断', param: 'on_hold' },
  { label: '中止', param: 'stop_watching' },
]

export class WorksPane extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      works: [],
    };

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderSpinner(loading) {
    if (loading) {
      return <LoadingSpinner />;
    }
    else {
      return;
    }
  }

  fetchWorks({statusIndex}) {
    this.setState({ loading: true, works: [] });

    this.props.annict.Me.Work.get({ filter_status: status[statusIndex].param })
    .then(res => {
      this.setState({ loading: false, works: res.works });
    })
    .done();
  }

  componentDidMount() {
    this.fetchWorks({ statusIndex: 0 });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{height: 64, paddingHorizontal: 10, paddingTop: 28, paddingBottom: 8, backgroundColor: '#444'}}>
          <TextInput
            style={{height: 25, borderRadius: 2, borderColor: '#e1e1e1', borderWidth: 1, backgroundColor: 'white', padding: 4, fontSize: 12}}
            placeholder='キーワードで検索...'
          />
        </View>

        <ScrollableTabView
          style={{flex:1}}
          tabBarUnderlineColor='#f85b73'
          tabBarActiveTextColor='#f85b73'
          tabBarInactiveTextColor='#666'
          tabBarBackgroundColor='white'
          onChangeTab={({i}) => this.fetchWorks({statusIndex: i})}
        >
          {status.map((tab) => {
            return (
              <View style={{flex:1}} tabLabel={tab.label} key={tab.param}>
                {this.renderSpinner(this.state.loading)}
                <ListView
                  style={{flex:1}}
                  enableEmptySections={true}
                  dataSource={this.ds.cloneWithRows(this.state.works)}
                  renderScrollComponent={(props) => <ScrollView style={{flex:1}}/>}
                  renderRow={(rowData) => {
                    return (
                      <View style={theme.cardStyle}>
                      <View style={{padding: 15, flex:1}}>
                        <Text style={{color: '#f85b73', flex:1}}>{rowData.title}</Text>
                      </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}
