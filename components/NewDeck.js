import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'

import * as _ from 'lodash'
import * as colors from '../utils/colors'
import  { saveDeck } from '../utils/helper'
import { setDeck } from '../actions'

class NewDecks extends Component {
    state = {
        deck: {
            name:'',
            questions:[]

        },
      };

    componentDidMount(){
        
    }
    
    handleSubmit =()=>{
        const  { add, goDeck } = this.props
        const deck = this.state.deck
        if(_.isEmpty(deck.name))
        {
            alert("Name is requered")
            return
        }

        add(deck)
        this.setState({
            deck:{
                name:'',
                questions:[]
            }
        })
        goDeck(deck)
        console.log("STATE",this.state)
        
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={style.container}>
                <View style={style.viewInput}>
                    <Text style={style.content}>Nome do seu novo Deck.</Text>
                    <TextInput  onChangeText={(text) => {
                      const { deck } = this.state
                        deck.name = text
                        this.setState({ deck })
                        }} 
                    placeholder="Insira o nome aqui" 
                    style={style.input} 
                    value={this.state.deck.name} />
                </View>
                <View style={Platform.OS !== 'ios' ? style.viewBtn:style.viewBtnIos}>
                    <TouchableOpacity onPress={this.handleSubmit} style={Platform.OS !== 'ios' ?
                    style.btnSubmit : style.iosBtnSubmit}>
                        <Text style={Platform.OS !== 'ios' ?{ color: colors.white,fontWeight:'bold',fontSize:20 }:{color:colors.white,fontWeight:'bold',fontSize:20}}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1
    },
    content: {
        color:colors.primary,
        fontSize: 30,
        alignSelf:'center'
    },
    input:{
        fontSize: 25,
        marginTop:20,
        textAlign:'center'
    },
    viewInput: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    viewBtn: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center'
    },
    viewBtnIos:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnSubmit: {
        backgroundColor: colors.primary,
        padding: 10,
        marginTop: 50,
        color: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 300
    },
    iosBtnSubmit:{
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:colors.white,
        borderWidth:1,
        padding:15,
        borderRadius:100,
        width:200,
        backgroundColor:colors.primary
    }
})

function mapDispatchToProps (dispatch, { navigation }) {
     return {
      add:(deck)=> {
          saveDeck(deck)
          dispatch(setDeck(deck))
      },
      goDeck: (deck) => navigation.navigate('Deck',{deck})
    }
}

export default connect(null,mapDispatchToProps)(NewDecks)

