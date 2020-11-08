import React from "react";

function Question() {
    
    return (
        <div>
            <input type="radio" name="quiz_answer" value="d3" />
            <input type="radio" name="quiz_answer" value="d2" />
            <input type="radio" name="quiz_answer" value="d1" />
            <input type="radio" name="quiz_answer" value="a1" />
            <input type="radio" name="quiz_answer" value="a2" />
            <input type="radio" name="quiz_answer" value="a3" />
        </div>
    );
}

export default Question;