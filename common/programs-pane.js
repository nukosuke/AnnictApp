import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, View, ScrollView, Text } from 'react-native';
import { ListView } from 'realm/react-native';
import Calendar from 'react-native-calendar';
import { LoadingSpinner } from './components';

export class ProgramsPane extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      programs: []
    };

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentDidMount() {
    this.fetchPrograms((new Date()).toISOString());
  }

  fetchPrograms(date) {
    this.setState({ loading: true });

    this.props.annict.Me.Program.get({
      filter_started_at_gt: date,
      sort_id: 'desc'
    })
    .then(res => {
      this.setState({ loading: false, programs: res.programs });
    })
    .done();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavigatorIOS
          barTintColor='#444'
          titleTextColor='#eee'
          initialRoute={{
            component: View,
            title: '放送予定',
            //pass
          }}
        />

        <View style={{marginTop: 65}}>
          <Calendar
            scrollEnabled={true}
            showControls={true}
            titleFormat={'YYYY年 M月'}
            dayHeadings={['日', '月', '火', '水', '木', '金', '土']}
            prevButtonText={'< 前月'}
            nextButtonText={'翌月 >'}
            onDateSelect={(date) => this.onDateSelect(date)}
            onTouchPrev={this.onPrev}
            onTouchNext={this.onNext}
            onSwipePrev={this.onPrev}
            onSwipeNext={this.onNext}
            customStyle={{day: {fontSize: 15, textAlign: 'center'}}}
            weekStart={1}
           />
         </View>

         {this.renderPrograms()}
      </View>
    );
  }

  renderPrograms() {
    if(this.state.loading) {
      return <LoadingSpinner />;
    }
    else {
      return (
        <ListView
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.state.programs)}
          renderRow={(rowData) => {
            return (
              <View style={{paddingVertical: 8, paddingHorizontal: 15}}>
                <Text style={{color: '#f85b73'}}>{rowData.work.title}</Text>
                <Text style={{color: '#666'}}>{rowData.episode.number_text}</Text>
                <Text style={{color: '#666'}}>{this.formatDate(rowData.started_at)}〜</Text>
              </View>
            );
          }}
        />
      );
    }
  }

  onPrev() {
    // load prev month animes
  }

  onNext() {
    // load next month animes
  }

  onDateSelect(date) {
    // fetch anime on date
    this.fetchPrograms((new Date(date)).toISOString());
  }

  //TODO: move to common/util
  formatDate(date) {
    date = new Date(date);
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  }
}
