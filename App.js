import React from 'react';
import { Constants, Permissions } from 'expo'
import { Provider } from 'react-redux'
import { StatusBar, View } from 'react-native';

import MainNavigation from './utils/Navigation'
import { askPermissionNotification, setLocalNotifiation } from './utils/helper'
import store from './utils/storeRedux'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

 async componentDidMount(){
    
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    
    if(status === 'undetermined')
    {
      status = await askPermissionNotification()
      if( status === 'denied')
      {
        alert('Você negou as permissões para receber notificações em seu app.')
      }
      else if(status === 'granted'){
        await setLocalNotifiation()
      }
    }
  }


  render() {
    return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor="#84e" barStyle="light-content" />
            <MainNavigation />
          </View>
        </Provider>
    );
  }
}


