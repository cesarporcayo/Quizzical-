import React, {useState} from "react"

export default function TriviaCard(props) {
    const [answerChoices, setAnswerChoices] = useState(initAnswerChoices())
    
    //handles question weird JSON markdown text for symbols
    let questionWithApostrophe = props.question.replace(/&#039;/g, "'")
    let questionWithAmp = questionWithApostrophe.replace(/&amp;/g, "&")
    let newQuestion = questionWithAmp.replace(/&quot;/g, "'")
    
    return (
        <div className="container--trivia-card">
            <h1 className="title--question">{newQuestion}</h1>
            
            <div className="conatainer--answers">
                {getAnswerChoiceElements()}
            </div>
            <br/>
            
        </div>
    )
    
    
    function initAnswerChoices() {
        let arr = randomizeAnswerChoices(props.allAnswers)
        return arr.map(answer => {
            console.log(answer)
            //handles question weird JSON markdown text for symbols
            let answerWithApostrophe = answer.replace(/&#039;/g, "'")
            let answerWithAmp = answerWithApostrophe.replace(/&amp;/g, "&")
            let newAnswer = answerWithAmp.replace(/&quot;/g, "'")


            return ({
                text: newAnswer,
                isClicked: false
            })
        })
        
    }
    
    function getAnswerChoiceElements() {
        let arr = answerChoices.map(answer => {
            return <button 
                className={getAnswerClassName(answer)}
                value={answer.text}
                name="answers"
                onClick={()=> {
                        handleAnswerClick(answer.text)
                    }
                }
                type="button"
                >{answer.text}
                
                
            </button>
        })
        return arr
    }
    
    function handleAnswerClick(selected) {
        // handles which answer isClicked for UI changes
        setAnswerChoices(prevAnswerChoices => prevAnswerChoices.map(answer => {
            if (answer.text === selected) {
                return {...answer, isClicked: true}
            } else {
                return {...answer, isClicked: false}
            }
        }))
        
        //updates userAnswers
        props.setUserAnswers(prevAnswers => {
            let tempArr = []
            for (let i =0; i < prevAnswers.length; i++) {
                if (i === props.index) {
                    tempArr.push(selected)
                } else {
                    tempArr.push(prevAnswers[i])
                }
            }
            // console.log(tempArr)
            return tempArr
        })
    }
    
    function randomizeAnswerChoices(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }
    
    function getAnswerClassName(answer) {
        if (props.formSubmitted) {
            if (props.correctAnswer === answer.text) {            
                return "button--answer-correct"
            } else if(answer.isClicked) {
                return "button--answer-incorrect"
            }
        } else {
            if (answer.isClicked) {
                return "button--answer-clicked"
            }
        }
        return "button--answer"     
    }
}



