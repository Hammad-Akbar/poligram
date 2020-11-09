import React from "react";

import Question from "./Question";
import Socket from "../Socket"

function Quiz() {
    
    React.useEffect(() => {
        Socket.on("quiz generated", (data) => {
            console.log("quiz gen!");
            console.log(data);
        });
    });
    
    function generateQuiz() {
        Socket.emit("request quiz");
    }
    
    return (
        <div style={{textAlign: "center"}}>
            <h2>Ideology Quiz</h2>
            <button onClick={generateQuiz}>Generate new quiz</button>
            <Question text="This is a sample text prop" index="1" />
        </div>
    );
}

export default Quiz;