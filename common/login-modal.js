import React, { Component, PropTypes } from 'react';
import { Modal, NavigatorIOS, View }   from 'react-native';
import { LoginWebViewBridge }          from './login-webview-bridge';

export class LoginModal extends Component {
  static propTypes = {
    realm: PropTypes.object.required
  }

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
    }
  }

  componentDidMount() {
    const { realm } = this.props;
    const token     = realm.objects('Token')[0];
    const hasToken  = token ? true : false;

    if(!hasToken) {
      this.setState({ visible: true });
    }
  }

  render() {
    const { realm } = this.props;

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
          <LoginWebViewBridge
            onGetToken={token => {
              const { access_token } = token;

              if(access_token) {
                //TODO: validate token
                realm.write(() => {
                  realm.create('Token', { access_token })
                });
                this.setState({ visible: false });
              }
            }}
          />
        </View>
      </Modal>
    );
  }
}
