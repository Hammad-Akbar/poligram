import React from "react";

import Question from "./Question";

function Quiz() {
    
    function generateQuiz() {
        console.log("quiz");
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