import logo from './logo.svg';
import './App.css';
import React, {useState} from "react"
import Landing from "./Pages/Landing"
import Quiz from "./Pages/Quiz"

function App() {
  const [page, setPage] = useState("LANDING")
    const [settings, setSettings] = useState({difficulty:"easy", numOfQuestions:5})
   
    switch (page) {
        case "LANDING":
            return <Landing setPage={setPage}
            setSettings={setSettings}
            settings={settings}/>
        case "QUIZ":
            return <Quiz 
            setPage={setPage}
            settings={settings}/>
    }
}

export default App;
