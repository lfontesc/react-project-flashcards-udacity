import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import * as colors from '../utils/colors'
import { removeDeck } from '../actions'
import { deleteDeck } from '../utils/helper'
class Deck extends Component {
    state= {
        deck:{}
    }
   
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
        
        return {
          title: `Deck ${deck.name}`
        }
      }

    goToAddCard = () => {
        const { navigation} = this.props
        const deck = navigation.state.params.deck
        navigation.push('NewCard',{ deck })
    }

    handleDeleteDeck = async (key) =>{
        const { navigation, dispatch } = this.props
        await deleteDeck(key)
        dispatch(removeDeck(key))
        navigation.goBack()
    }

    goToQuiz = () => {
        const { navigation } = this.props
        const deck =  navigation.state.params.deck
        navigation.push('Quiz',{ deck })
    }

    render(){
        
        const { decks, navigation } = this.props

        const deck = decks[navigation.state.params.deck.name]
        if(deck ===undefined)
        {
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:30}}>Carregando...</Text>
                </View>
            )
        }
        return(
            <View style={style.container}>
                <Text style={style.deckName}>{deck.name}</Text>
                <Text style={style.cardCount}>{deck.questions.length} cartões</Text> 
                <TouchableOpacity 
                    style={style.btnAddCard}
                    onPress={this.goToAddCard} >
                    <Text style={{color:colors.white, fontSize:20}}>Adicionar Cartão</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={style.btnDeleteDeck}
                    onPress={() => this.handleDeleteDeck(deck.name)} >
                    <Text style={{color:colors.white, fontSize:20}}>Remover Deck</Text>
                </TouchableOpacity>   
                {deck.questions.length > 0 &&<TouchableOpacity 
                style={style.btnQuiz}
                onPress={this.goToQuiz}
                >
                    <Text style={{color:colors.white, fontSize:20}}>Iniciar Quiz</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const btn = {
    backgroundColor:'transparent',
    padding:10,
    borderRadius:4,        
    margin:5,
    width:200,
    height:45,
    alignItems:"center",
    justifyContent:'center'
}

const style = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    deckName:{
        fontSize:30,
        marginBottom:10
    },
    cardCount:{
        fontSize: 18,
        marginBottom:50
    },
    btnAddCard:{
        ...btn,
        backgroundColor:colors.green,
    },
    btnQuiz:{
        ...btn,
        backgroundColor:'#84e',
        borderWidth:0,
        
    },
    btnDeleteDeck:{
        ...btn,
        backgroundColor:colors.danger
    }
})

function mapStateToProps (decks) {
    return { decks }
}

export default connect(mapStateToProps)(Deck)