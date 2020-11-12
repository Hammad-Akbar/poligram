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
                        <Question text={question['text']} />
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
        alert("hello!");
        
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