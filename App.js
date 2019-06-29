import React from 'react';
import { Constants, Permissions } from 'expo'
import { Provider } from 'react-redux'
import { StatusBar, View } from 'react-native';

import MainNavigation from './utils/mainNavigation'
import { askPermissionNotification, setLocalNotifiation } from './utils/helper'
import store from './utils/store'

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
        alert('You denied receiving notifications for this app.')
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


