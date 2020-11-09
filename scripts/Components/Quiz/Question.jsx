import React from "react";

function Question(props) {
    
    const answerBlockStyle = {
        display: "inline-block",
        textAlign: "center",
        width: "7em",
        verticalAlign: "top",
        fontFamily: "verdana"
    };
    
    const questionTextStyle = {
        paddingBottom: "1em",
        fontFamily: "verdana",
        fontSize: "1.1em"
    };
    
    return (
        <div style={{textAlign: "center"}}>
            <div style={questionTextStyle}>
                {props.text}
            </div>
            <div>
                <div style={answerBlockStyle}>
                    <input type="radio" name={"quiz_answer_" + props.index} id="d3" value="d3" /><br />
                    <label>Strongly Disagree</label>
                </div>
                <div style={answerBlockStyle}>
                    <input type="radio" name={"quiz_answer_" + props.index} id="d2" value="d2" /><br />
                    <label>Disagree</label>
                </div>
                <div style={answerBlockStyle}>
                    <input type="radio" name={"quiz_answer_" + props.index} id="d1" value="d1" /><br />
                    <label>Somewhat Disagree</label>
                </div>
                <div style={answerBlockStyle}>
                    <input type="radio" name={"quiz_answer_" + props.index} id="a1" value="a1" /><br />
                    <label>Somewhat Agree</label>
                </div>
                <div style={answerBlockStyle}>
                    <input type="radio" name={"quiz_answer_" + props.index} id="a2" value="a2" /><br />
                    <label>Agree</label>
                </div>
                <div style={answerBlockStyle}>
                    <input type="radio" name={"quiz_answer_" + props.index} id="a3" value="a3" /><br />
                    <label>Strongly Agree</label>
                </div>
            </div>
        </div>
    );
}

export default Question;