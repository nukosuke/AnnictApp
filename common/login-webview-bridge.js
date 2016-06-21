import React, { Component, PropTypes } from 'react';
import WebViewBridge from 'react-native-webview-bridge';
import {
  AUTHORIZE_URI,
  CLIENT_ID,
  REDIRECT_URI
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
  onBridgeMessage(message) {
    switch (message) {
      case 'continue':
        // auth step
        console.log('continue');
        break;

      default:
        // auth code
        console.log(message);
        break;
    }
  }

  render() {
    return (
      <WebViewBridge
        ref='auth_webview_bridge'
        onBridgeMessage={(msg) => console.log(msg)}
        injectedJavaScript={injectJavaScript}
        source={{uri: `${AUTHORIZE_URI}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`}}
      />
    );
  }
}
