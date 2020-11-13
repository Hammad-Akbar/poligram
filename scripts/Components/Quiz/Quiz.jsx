import React from "react";

import Question from "./Question";
import Socket from "../Socket"

function Quiz() {
    const [quiz, setQuiz] = React.useState(null);
    
    React.useEffect(() => {
        Socket.on("quiz generated", (data) => {
            let questions = data.map((question, i) => {
                let bgColor;
                if (i % 2 == 0) {
                    bgColor = "white";
                } else {
                    bgColor = "#D3D3D3";
                }
                
                return (
                    <div style={{padding: "1em", background: bgColor}}>
                        <Question text={question['text']} multiplier={question['multiplier']} index={i} />
                    </div>
                );
            });
            
            setQuiz(
                <div>
                    <form onSubmit={submitQuiz}>
                        <div style={{margin: "2em", border: "solid"}}>
                            {questions}
                        </div>
                        <button style={{marginBottom: "3em"}}>Submit quiz</button>
                    </form>
                </div>
            );
        });
        
        return () => {
            Socket.off("quiz generated");  
        };
    });
    
    function generateQuiz() {
        Socket.emit("request quiz");
    }
    
    function submitQuiz(event) {
        let score = 0;
        
        for (let radio of event.target) {
            if (radio.checked) {
                let multiplier = radio.name.substring(radio.name.indexOf(",")+1);
                score += multiplier * radio.value;
                
                console.log("mult: " +  multiplier + ", val: " + radio.value + ", score: " + score);
            }
        }
        
        console.log("FINAL SCORE: " + score);
        
        event.preventDefault();
    }
    
    return (
        <div style={{textAlign: "center"}}>
            <h2>Ideology Quiz</h2>
            <button onClick={generateQuiz}>Generate new quiz</button>
            {quiz}
        </div>
    );
}

export default Quiz;