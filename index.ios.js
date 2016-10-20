/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
const injectScript = `
  (function () {
                    if (WebViewBridge) {

                      WebViewBridge.onMessage = function (message) {
                        if (message === "hello from react-native") {
                          WebViewBridge.send("got the message inside webview");
                        }
                      };

                      WebViewBridge.send("hello from webview");
                    }
                  }());
`;

export default class wvb extends Component {
  onBridgeMessage = (message) => {
    const { webviewbridge } = this.refs;
    switch (message) {
      case "hello from webview":
        webviewbridge.sendToBridge("hello from react-native");
        break;
      case "got the message inside webview":
        console.log("we have got a message from webview! yeah");
        break;
    }
  }
  render() {
    console.log("on render");
    return (
      <WebViewBridge
        ref="webviewbridge"
        onBridgeMessage={this.onBridgeMessage.bind(this)}
        injectedJavaScript={injectScript}
        scrollEnabled={false}
        source={require("wv-svg-map/index.html")}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('wvb', () => wvb);
