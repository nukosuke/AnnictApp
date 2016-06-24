import React, { Component, PropTypes } from 'react';
import { Modal, View, Text, TextInput, StatusBar } from 'react-native';

export class RecordModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
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
            <Text style={{flex: 1}}>aaa</Text>
          </View>
          <TextInput multiline={true} placeholder='感想を記録しましょう' />
          <View>
          </View>
        </View>
      </Modal>
    );
  }
}
