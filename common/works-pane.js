import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Modal } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ListView } from 'realm/react-native';
import { getTheme, mdl } from 'react-native-material-kit';
import { LoadingSpinner } from './components';
import ICon from 'react-native-vector-icons/MaterialIcons';
import { RecordModal } from './record-modal';

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
      // episode list modal follow
      selectedWorkTitle: '',
      selectedEpisode: { id: null, number_text: '' },
      episodes: [],
      loadingEpisodes: false,
      visibleEpisodes: false,
      visibleRecordModal: false,
      searchText: ''
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

  onPressRow(rowData) {
    this.setState({ selectedWorkTitle: rowData.title, loadingEpisodes: true, visibleEpisodes: true, episodes: [] });

    this.props.annict.Episode.get({
      filter_work_id: rowData.id,
      sort_sort_number: 'asc'
    })
    .then(res => {
      this.setState({ loadingEpisodes: false, episodes: res.episodes });
    })
    .done();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{height: 64, paddingHorizontal: 32, paddingTop: 28, paddingBottom: 8, backgroundColor: '#444'}}>
          <TextInput
            style={{height: 25, borderRadius: 2, borderColor: '#e1e1e1', borderWidth: 1, backgroundColor: 'white', padding: 4, fontSize: 12}}
            placeholder='キーワードで検索...'
            value={this.state.searchText}
          />
        </View>

        <Modal animationType='fade' visible={this.state.visibleEpisodes}>
          <View style={{flex: 1, paddingTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => this.setState({visibleEpisodes: false})}>
                <ICon style={{fontSize: 30, color: '#f85b73'}} name='navigate-before' />
              </TouchableWithoutFeedback>
              <Text style={{alignSelf: 'center', color: '#666'}}>{this.state.selectedWorkTitle}</Text>
            </View>

            {this.renderSpinner(this.state.loadingEpisodes)}
            <ListView
              style={{flex:1}}
              enableEmptySections={true}
              dataSource={this.ds.cloneWithRows(this.state.episodes)}
              renderRow={rowData => {
                return (
                  <TouchableHighlight
                    onPress={() => {
                      this.setState({ visibleRecordModal: true, selectedEpisode: rowData });
                    }}
                    underlayColor='#ddd'
                  >
                    <View style={theme.cardStyle}>
                      <Text style={{padding: 15}}>
                        <Text style={{color: '#666'}}>{rowData.number_text} </Text>
                        <Text style={{color: '#f85b73'}}>{rowData.title}</Text>
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }}
            />
          </View>

          <RecordModal
            annict={this.props.annict}
            visible={this.state.visibleRecordModal}
            title={this.state.selectedWorkTitle}
            episode={this.state.selectedEpisode}
            onCancel={() => {
              this.setState({ visibleRecordModal: false });
            }}
          />
        </Modal>


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
                      <TouchableHighlight onPress={() => this.onPressRow(rowData)} underlayColor='#ddd'>
                        <View style={theme.cardStyle}>
                          <View style={{padding: 15, flex:1}}>
                            <Text style={{color: '#f85b73', flex:1}}>{rowData.title}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
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
