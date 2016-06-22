import React, { Component } from 'react';
import { Modal, NavigatorIOS, View } from 'react-native';
import { LoginWebViewBridge }        from './login-webview-bridge';

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    const hasToken = this.props.token ? true : false;

    if(!hasToken) {
      this.setState({ visible: true });
    }
  }

  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.state.visible}
      >
        <NavigatorIOS
          barTintColor='#333'
          titleTextColor='#eee'
          initialRoute={{
            component: View,
            title: 'ログイン'
          }}
        />
        <View style={{flex: 1, paddingTop: 64}}>
          <LoginWebViewBridge />
        </View>
      </Modal>
    );
  }
}
