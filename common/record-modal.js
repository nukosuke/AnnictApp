import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar,
  Slider
} from 'react-native';
import { MKIconToggle } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export class RecordModal extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    episode: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      sliderThumb: null,

      // follows are request parameters
      episode_id     : null, //TODO: this.props.episode_id
      comment        : '',
      rating         : 0,
      share_twitter  : false,
      share_facebook : false,
    };
  }

  componentWillMount() {
    FAIcon.getImageSource('star', 22, '#ccc')
    .then(source => {
      this.setState({ sliderThumb: source })
    })
    .done();
  }

  sendRequest() {
    const { episode_id, comment, rating, share_twitter, share_facebook } = this.state;

    this.props.annict.Me.Record.create({
      episode_id, comment, rating, share_twitter, share_facebook
    })
    .then(res => {
      //TODO: complete toast
    })
    .done();
  }

  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.visible}
      >
        <StatusBar barStyle='default' />
        <View style={{flex: 1, paddingTop: 28}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, paddingHorizontal: 15}}>{this.props.title} {this.props.episode.number_text}</Text>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
              <View style={{alignItems: 'flex-end', paddingHorizontal: 15}}>
                <Icon style={{fontSize: 22, color: '#f85b73'}} name='clear' />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TextInput
            style={{flex: 1, fontSize: 18, paddingHorizontal: 15}}
            multiline={true}
            placeholder='見た感想を残してみませんか？'
            onChangeText={text => { this.setState({ comment: text }); }}
          />
          <View  style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ddd'}}>
            <MKIconToggle

              checked={this.state.share_twitter}
              onCheckedChange={() => {this.setState({ share_twitter: !this.state.share_twitter })}}
            >
              <FAIcon state_checked={true} style={{fontSize: 22, color: '#00aced'}} name='twitter' />
              <FAIcon style={{fontSize: 22, color: '#ccc'}} name='twitter' />
            </MKIconToggle>
            <MKIconToggle

              checked={this.state.share_facebook}
              onCheckedChange={() => {this.setState({ share_facebook: !this.state.share_facebook })}}
            >
              <FAIcon state_checked={true} style={{fontSize: 22, color: '#305097'}} name='facebook-official' />
              <FAIcon style={{fontSize: 22, color: '#ccc'}} name='facebook-official' />
            </MKIconToggle>

            {/* TODO: visible star interface */}
            <View style={{justifyContent: 'center'}}>
              <Text style={{width: 22, color: '#666'}}>{this.state.rating}</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 8}}>

              <Slider

                thumbImage={this.state.sliderThumb}
                minimumValue={0}
                maximumValue={5}
                step={0.1}
                onValueChange={value => {
                  const color = (value > 0.9) ? '#ff9800' : '#ccc';
                  FAIcon.getImageSource('star', 22, color)
                  .then(source => {
                    this.setState({ sliderThumb: source, rating: value });
                  })
                  .done()
                }}
              />
            </View>

            {/* TODO: button */}
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={{color: '#f85b73'}}>記録</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <KeyboardSpacer />
        </View>
      </Modal>
    );
  }
}
