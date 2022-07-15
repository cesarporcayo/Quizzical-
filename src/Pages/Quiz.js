import React, {useState, useEffect} from "react"
import TriviaCard from "../Components/TriviaCard"

export default function Quiz(props) {

    const [data, setData] = useState([])
    
    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://opentdb.com/api.php?amount=${props.settings.numOfQuestions}&difficulty=${props.settings.difficulty}`)
            const inData = await res.json()
            setData(inData.results)
        }    
        getData()
    }, [])


    const [triviaCards, setTriviaCards] = useState([]) //original was replacing [] with initTriviaCards()
    const [userAnswers, setUserAnswers] = useState(initUserAnswers())
    const [formSubmitted, setFormSubmitted] = useState(false)
    
    // handles if setTriviaCards() is ran before data is loaded from API
    useEffect(()=> {
        setTriviaCards(initTriviaCards())
    }, [data])
        
    
    return (
        <div id="quiz">
            <img  className="img--landing-yellow" src="https://crispygreen.com/wp-content/uploads/2022/01/yellow-blob.svg"/>
            <img className="img--landing-light-blue" src="https://images.squarespace-cdn.com/content/v1/5b297e6bf93fd4e99137cbd7/1541462226680-4TOOVQI41OEGMC2AQ9EU/ke17ZwdGBToddI8pDm48kIJBLFfio4tFebut6WPk2gJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxzWow-JqB08BAyY8S99fNxGOpfz-uTKDbwvm2v6LuMFZyF3Jh1LlseWloa-AZOVkY/light+blue+blob.png"/>
            <div className="container--quiz">
                <form onSubmit={handleSubmit}>
                    {getTriviaElements()}
                    
                    <span> 
                        <p className="description--results">{formSubmitted ? `You scored ${getNumCorrectAnswers()}/${data.length} correct answers!` : ""}</p> 
                        <button className={checkAllAnswered() ? "button--submit" : "button--no-submit"}>{formSubmitted ? "Return Home" : "Check Answers"}</button>
                    </span>
                    
                </form>
                
            </div>
        </div>
        
    )
    
    function handleSubmit(e) {
        e.preventDefault()
        if (!checkAllAnswered()) {
            alert("You must answer all questions before submitting.")
        } else {
            if (!formSubmitted) {
                setFormSubmitted(true)
            } else {
                props.setPage("LANDING")
            }
        } 
    }
    
    function getTriviaElements() {
        // console.log(triviaCards)
        let arr = triviaCards.map(card => {
            return <div>
                <TriviaCard
                key={card.id}
                index={card.id-1}
                question={card.question}
                correctAnswer={card.correctAnswer}
                allAnswers={card.incorrectAnswers.concat(card.correctAnswer)}
                setUserAnswers={setUserAnswers}
                userAnswers={userAnswers}
                formSubmitted={formSubmitted}
             />
             <hr/>
            </div>
        })
        return arr
    }
    
    function initTriviaCards() {
        // console.log(data)
        let tempArr = []
        for (let i = 0; i < data.length; i++) {
            tempArr.push({
                id: i+1,
                question: data[i].question,
                correctAnswer: data[i].correct_answer,
                incorrectAnswers: data[i].incorrect_answers,
            })
        }      
        // console.log(tempArr)
        return tempArr
    }
    
    function checkAllAnswered() {
        for (let i =0; i < userAnswers.length; i++) {
            if (!userAnswers[i]) {
                return false
            }
        }
        return true
    }
    
    function getNumCorrectAnswers() {
        let count = 0
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] === triviaCards[i].correctAnswer) {
                count = count + 1
            }
        }
        return count;
    }
    
    function initUserAnswers() {
        let tempArr = []
        for (let i=0; i < props.settings.numOfQuestions; i++) {
            tempArr.push("")
        }
        return tempArr
    }
}