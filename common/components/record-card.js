import React, { Component, PropTypes } from 'react';
import { View, Text }  from 'react-native';
import { getTheme }    from 'react-native-material-kit';
import { AnnictColor, TextColor } from './style';
import Icon            from 'react-native-vector-icons/FontAwesome';

const theme = getTheme();
const style = {
  cardOuter: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  cardInner: {
    paddingHorizontal: 15,
    paddingTop: 15
  },
  username: {
    color: AnnictColor
  },
  work: {
    color: AnnictColor
  },
  text: {
    color: TextColor
  }
}

export class RecordCard extends Component {
  static propTypes = {
    username    : PropTypes.string.isRequired,
    workTitle   : PropTypes.string.isRequired,
    episodeText : PropTypes.string.isRequired,
    rating      : PropTypes.number,
    comment     : PropTypes.string
  }

  render() {
    const {
      username,
      workTitle,
      episodeText,
      rating,
      comment
    } = this.props;

    return (
      <View style={style.cardOuter}>
        <View style={theme.cardStyle}>
          <Text style={style.cardInner}>
            <Text style={style.username}>{username}</Text>
            <Text style={style.text}> が </Text>
            <Text style={style.work}>{workTitle} {episodeText}</Text>
            <Text style={style.text}> を見ました</Text>
          </Text>
          {this.renderRatingStar(rating)}
          {this.renderComment(comment)}
        </View>
      </View>
    );
  }

  renderRatingStar(rating) {
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
}
