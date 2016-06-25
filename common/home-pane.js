import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, View, ScrollView, Text, Image } from 'react-native';
import { ListView } from 'realm/react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const theme = getTheme();

export class HomePane extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired,
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
                      {this.getStarFromRating(rowData.rating)}
                      {this.renderComment(rowData.comment)}
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
