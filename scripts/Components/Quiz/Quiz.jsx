import React from "react";

import Question from "./Question";
import Socket from "../Socket"

function Quiz() {
    const [quiz, setQuiz] = React.useState(null);
    
    React.useEffect(() => {
        Socket.on("quiz generated", (data) => {
            let questions = data.map((question) => {
                return (
                    <div style={{margin: "2em"}}>
                        <Question text={question['text']} />
                    </div>
                );
            });
            
            setQuiz(
                <div style={{margin: "2em"}}>
                    {questions}
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
    
    return (
        <div style={{textAlign: "center"}}>
            <h2>Ideology Quiz</h2>
            <button onClick={generateQuiz}>Generate new quiz</button>
            {quiz}
        </div>
    );
}

export default Quiz;