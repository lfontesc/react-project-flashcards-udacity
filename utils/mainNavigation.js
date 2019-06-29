import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import Decks from '../components/Decks'
import NewDeck from '../components/NewDeck'
import Deck from '../components/Deck'
import NewCard from '../components/NewCard'
import Quiz from '../components/Quiz'
import * as colors from '../utils/colors'

const Tabs = createMaterialTopTabNavigator({
    Decks:{
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    NewDeck:{
      screen: NewDeck,
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
      screen:NewCard,
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