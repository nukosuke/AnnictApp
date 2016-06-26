import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ListView } from 'realm/react-native';
import { getTheme, mdl } from 'react-native-material-kit';

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
      works: []
    };

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderSpinner(loading) {
    if (loading) {
      return (
        <View style={{padding: 64, alignItems: 'center'}}>
          <mdl.Spinner strokeColor='#f85b73' />
        </View>);
    }
    else {
      return;
    }
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
          tabBarInactiveTextColor='#666'
          tabBarBackgroundColor='white'
          onChangeTab={({i}) => {
            this.setState({ loading: true, works: [] });

            this.props.annict.Me.Work.get({ filter_status: status[i].param })
            .then(res => {
              this.setState({ loading: false, works: res.works });
            })
            .done();
          }}
        >
          {status.map((tab) => {
            return (
              <View tabLabel={tab.label} key={tab.param}>
                {this.renderSpinner(this.state.loading)}
                <ListView
                  enableEmptySections={true}
                  dataSource={this.ds.cloneWithRows(this.state.works)}
                  renderRow={(rowData) => {
                    return (
                      <View style={theme.cardStyle}>
                        <Text>{rowData.title}</Text>
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
