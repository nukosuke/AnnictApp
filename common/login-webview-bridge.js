import React, { Component, PropTypes } from 'react';
import WebViewBridge from 'react-native-webview-bridge';
import {
  AUTHORIZE_URI,
  CLIENT_ID,
  REDIRECT_URI,
  TOKEN_PUBLISHER_URI
} from './constants/client-constants';


const injectJavaScript = `
(function(){
  var code = document.querySelector('code');

  if(code) {
    WebViewBridge.send(code.innerText);
  }
  else {
    WebViewBridge.send('continue');
  }
}());
`;

export class LoginWebViewBridge extends Component {

  static propTypes = {
    onGetToken: PropTypes.func.isRequired
  }

  onBridgeMessage(message) {
    const { onGetToken } = this.props;

    switch (message) {
      case 'continue':
        // auth step
        break;

      default:
        // auth code
        //TODO: validate message as code

        fetch(TOKEN_PUBLISHER_URI, {
          method: 'POST',
          headers: {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            code: message
          })
        })
        .then(response => response.json())
        .then(onGetToken)
        .done();
        break;
    }
  }

  render() {
    return (
      <WebViewBridge
        ref='auth_webview_bridge'
        onBridgeMessage={this.onBridgeMessage}
        injectedJavaScript={injectJavaScript}
        source={{uri: `${AUTHORIZE_URI}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`}}
      />
    );
  }
}
