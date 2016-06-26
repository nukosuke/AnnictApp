import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StatusBar
} from 'react-native';

export class RecordModal extends Component {
  static propTypes = {
    annict: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      record: {

      }
    };
  }

  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.visible}
      >
        <StatusBar barStyle='default' />
        <View style={{paddingTop: 28}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 4}}>aaa</Text>
            <TouchableHighlight onPress={this.props.onCancel}>
              <Text style={{flex: 1}}>キャンセル</Text>
            </TouchableHighlight>
          </View>
          <TextInput multiline={true} placeholder='感想を記録しましょう' />
          <View>
          </View>
        </View>
      </Modal>
    );
  }
}
