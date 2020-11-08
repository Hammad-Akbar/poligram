import React from "react";

function Question() {
    
    return (
        <div>
            <div>
                <input type="radio" name="quiz_answer" id="d3" value="d3" /><br />
                <label for="d3">Strongly Disagree</label>
            </div>
            <div>
                <input type="radio" name="quiz_answer" id="d2" value="d2" /><br />
                <label for="d2">Disagree</label>
            </div>
            <div>
                <input type="radio" name="quiz_answer" id="d1" value="d1" /><br />
                <label for="d1">Somewhat Disagree</label>
            </div>
            <div>
                <input type="radio" name="quiz_answer" id="a1" value="a1" /><br />
                <label for="a1">Somewhat Agree</label>
            </div>
            <div>
                <input type="radio" name="quiz_answer" id="a2" value="a2" /><br />
                <label for="a2">Agree</label>
            </div>
            <div>
                <input type="radio" name="quiz_answer" id="a3" value="a3" /><br />
                <label for="a3">Strongly Agree</label>
            </div>
        </div>
    );
}

export default Question;