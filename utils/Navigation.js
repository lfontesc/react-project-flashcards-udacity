import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Platform } from 'react-native';

//components
import ListaDecks from '../components/ListaDecks'
import NovoDeck from '../components/NovoDeck'
import Deck from '../components/Deck'
import NovoCartao from '../components/NovoCartao'
import Quiz from '../components/Quiz'

//utils
import * as colors from './colors'

const Tabs = createMaterialTopTabNavigator({
    Decks:{
      screen: ListaDecks,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    NewDeck:{
      screen: NovoDeck,
      navigationOptions: {
        tabBarLabel: 'Novo Deck',
      },
    }
  },{
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? colors.primary : 'white',
      inactiveTintColor:Platform.OS === 'ios' ? 'black':'white',
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : colors.primary,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })
  
  const MainNavigation = createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }),
    },
    NewCard:{
      screen:NovoCartao,
      navigationOptions:({navigation})=>({
        headerTintColor:colors.white,
        headerStyle:{
          backgroundColor:colors.primary
        }
      })
    },
    Quiz:{
      screen:Quiz,
      navigationOptions:({navigation})=>({
        headerTintColor:colors.white,
        headerStyle:{
          backgroundColor:colors.primary,
        },
      })
    }
  });

  export default MainNavigation