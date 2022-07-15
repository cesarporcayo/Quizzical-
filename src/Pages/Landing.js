import React from "react"
import "../style.css"
export default function Landing(props) {
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        props.setSettings(prevSettings => {
            return {
                ...prevSettings,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    return (
        <body id="landing">
            <img  className="img--landing-yellow" src="https://crispygreen.com/wp-content/uploads/2022/01/yellow-blob.svg"/>
            <img className="img--landing-light-blue" src="https://images.squarespace-cdn.com/content/v1/5b297e6bf93fd4e99137cbd7/1541462226680-4TOOVQI41OEGMC2AQ9EU/ke17ZwdGBToddI8pDm48kIJBLFfio4tFebut6WPk2gJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxzWow-JqB08BAyY8S99fNxGOpfz-uTKDbwvm2v6LuMFZyF3Jh1LlseWloa-AZOVkY/light+blue+blob.png"/>
            <div className="container--landing">
                
                <h1 className="title--main">Quizzical</h1>
                <h4 className="description--main"> Test your knowledge with some randomly generated trivia!~</h4>
                <form className="form--landing">
                    <h4>Number of Questions: </h4>
                    <div className="container--num-questions">
                        <input type="radio" id="5" value={5} name="numOfQuestions" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="5">5</label>
                        <input type="radio" id="10" value={10} name="numOfQuestions" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="10">10</label>
                        <input type="radio" id="15" value={15} name="numOfQuestions" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="15">15</label>
                        <input type="radio" id="20" value={20} name="numOfQuestions" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="20">20</label>
                    </div>
                    <h4>Difficulty: </h4>
                    <div className="container--num-questions">
                        <input type="radio" id="easy" value="easy" name="difficulty" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="easy">Easy</label>
                        <input type="radio" id="medium" value="medium" name="difficulty" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="medium">Medium</label>
                        <input type="radio" id="hard" value="hard" name="difficulty" className="button--radio" onChange={handleChange}/>
                        <label htmlFor="hard">Hard</label>
                    </div>
                    
                    
                    <button
                    onClick={() => props.setPage("QUIZ") } 
                    type="button" 
                    className="button--start">Start quiz</button> 
                </form>
                
                
            </div>
        </body>
        
    )
}