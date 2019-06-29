import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as colors from '../utils/colors'
import { setLocalNotifiation } from '../utils/helper'
class Quiz extends PureComponent {

    state = {
        questionIndex: 0,
        numberCorrectAnswers: 0,
        showAnswer: false,
        deck: null
    }

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params

        return {
            title: `Quiz do deck: ${deck.name}`
        }
    }
    componentDidMount(){
        const { navigation }  = this.props
        const deck = navigation.state.params
        console.log("DECK", deck)
        this.setState(deck)
    }

    handleShowAnswers = () => {
        this.setState({...this.state,showAnswer:!this.state.showAnswer})
    }

    handleSubmitAnswers = async (answers) => {
        const { deck, questionIndex, numberCorrectAnswers, showAnswer } = this.state

        if(answers==='correct'){
            this.setState((state)=>{
                return {...state,numberCorrectAnswers:numberCorrectAnswers +1 }
            })
        }

        this.setState((state)=>{
            return { ...state,questionIndex:questionIndex +1,showAnswer:!showAnswer}
        })

        if(questionIndex+1 === deck.questions.length)
        {
          await setLocalNotifiation()
        }
    }

    handleGoBack = () =>{
        this.props.navigation.goBack()
    }

    handleResetQuiz =()=>{
        this.setState({
            questionIndex: 0,
            numberCorrectAnswers: 0,
            showAnswer: false
        })
    }
    render() {
        const { questionIndex, deck, numberCorrectAnswers } = this.state

        if (!deck || !deck.questions) {
            return <View><Text>No deck loaded.</Text></View>
        }
        
        if (questionIndex >= deck.questions.length) {
            return (
                <GameOver score={((numberCorrectAnswers/deck.questions.length)*100).toFixed(0)} handleGoBack={this.handleGoBack} handleResetQuiz={this.handleResetQuiz} />
            )
        }

        return (
            <Game questionIndex={questionIndex} 
            deck={deck} 
            showAnswer={this.state.showAnswer} 
            handleSubmitAnswers={this.handleSubmitAnswers}
            handleShowAnswers={this.handleShowAnswers} />
        )

    }
}


const Game = ({ deck, handleShowAnswers, showAnswer, questionIndex = 0, handleSubmitAnswers }) => {
    console.log("DECK 3", deck)
    
    return (
        <View style={style.container}>
            <View style={style.stage}>
                <Text style={style.score}>Perguntas: {questionIndex+1}/{deck.questions.length}</Text>
            </View>
            <View style={[style.box, style.questions, style.card]}>
                {!showAnswer && <Text style={{fontSize: 20, color:colors.primary}}>Pergunta</Text>}
                {!showAnswer &&  <Text style={style.text}>{deck.questions[questionIndex].question}</Text>}
                {showAnswer && <Text style={{fontSize: 20, color:colors.primary}}>Resposta</Text>}
                {showAnswer && <Text style={style.text}>{deck.questions[questionIndex].awers}</Text>}
                {!showAnswer &&<TouchableOpacity style={style.btnAwers} onPress={handleShowAnswers}>
                    <Text style={{ color: colors.orage, fontSize: 20 }}>ver resposta</Text>
                </TouchableOpacity>}
            </View>
            <View style={style.box}>
                { showAnswer && <View>
                    <TouchableOpacity style={style.btnCorrect} onPress={()=>handleSubmitAnswers('correct')}>
                        <Text style={{ color: colors.white }}>Correto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnIncorrect} onPress={()=>handleSubmitAnswers('incorrect')}>
                        <Text style={{ color: colors.white }}>Incorreto</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

const GameOver = ({ score,handleGoBack, handleResetQuiz }) => {
    return (
        <View style={style.container}>
            <View style={[style.box]}>
                <Text style={style.textGameOver}>Fim de Jogo</Text>
                <Text style={{ fontSize: 20, color:colors.primary }}>Você conseguiu {`${score}% de respostas corretas.`}</Text>
            </View>
            <View style={[style.row]}>
                <TouchableOpacity style={style.btnDefault} onPress={handleResetQuiz}>
                    <Text style={{ color: colors.white }}>Reiniciar Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btnDefault} onPress={handleGoBack}>
                    <Text style={{ color: colors.white }}>Retornar para o Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const btn = {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 4,
    margin: 5,
    width: 200,
    height: 45,
    alignItems: "center",
    justifyContent: 'center'
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    score:{
        fontSize: 20, 
        padding: 10, 
        fontWeight: "bold"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    stage: {
        alignSelf: 'stretch',
    },
    btnCorrect: {
        ...btn,
        backgroundColor: colors.green
    },
    btnAwers: {
        ...btn,
        borderWidth: 0,
    },
    btnIncorrect: {
        ...btn,
        backgroundColor: colors.danger
    },
    btnDefault: {
        ...btn,
        backgroundColor: colors.grey,
        borderWidth: 0,
        width: 150
    },
    card: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    questions: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 4,
        width: "80%",
        justifyContent: 'space-around'

    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 25,
        textAlign: 'center'
    },textGameOver:{
        fontSize: 50,
        color: colors.primary,
        justifyContent: 'flex-start'
    }
})
export default Quiz