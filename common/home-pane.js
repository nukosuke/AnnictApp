import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, View, ScrollView, Text, Image, RefreshControl } from 'react-native';
import { ListView } from 'realm/react-native';
import { RecordCard, LoadingSpinner } from './components';

export class HomePane extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state ={
      loading: false,
      refreshing: false,
      records: []
    }

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.annict.Record.get({ sort_id: 'desc' })
    .then(body => {
      this.setState({ loading: false, records: body.records });
    })
    .catch(err => {
      console.log(err);
      // alert dialog
    })
    .done();
  }

  onRefresh() {
    this.setState({ refreshing: true });

    this.props.annict.Record.get({ sort_id: 'desc' })
    .then(body => {
      this.setState({ refreshing: false, records: body.records });
    })
    .catch(err => {
      console.log(err);
      // alert dialog
    })
    .done();
  }

  getStarFromRating(rating) {
    if(rating === null) {
      return;
    }
    else {
      const fullStar  = Math.floor(rating);
      const halfStar  = String(rating).split('.')[1] ? 1 : 0;
      const emptyStar = 5 - fullStar - halfStar;

      const stars = [].concat(
        Array(fullStar).fill('star'),
        halfStar ? ['star-half-o'] : [],
        Array(emptyStar).fill('star-o')
      );

      return (
        <View style={{paddingHorizontal: 15, paddingTop: 8}}>
          <Text style={{color: '#ff9800'}}>
            {stars.map((star, idx) => <Icon key={idx} name={star} />)}
          </Text>
        </View>
      );
    }
  }

  renderComment(comment) {
    if(comment === null || comment.length === 0) {
      return (
        <View style={{paddingBottom: 15}}></View>
      );
    }
    else {
      return (
        <Text style={theme.cardContentStyle}>
          {comment}
        </Text>
      );
    }
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

        {this.renderTimeline()}

      </View>
    );
  }

  renderTimeline() {
    if(this.state.loading) {
      return (
        <View style={{marginTop: 65}}>
          <LoadingSpinner />
        </View>
      );
    }
    else {
      return (
        <ListView
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.state.records)}
          renderScrollComponent={props =>
            <ScrollView
              style={{flex: 1, marginTop: 65}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
            />
          }
          renderRow={(rowData) =>
            <RecordCard
              username={rowData.user.name}
              workTitle={rowData.work.title}
              episodeText={rowData.episode.number_text}
              rating={rowData.rating}
              comment={rowData.comment}
            />
          }
        />
      );
    } // /else
  } // /renderTimeline
}
