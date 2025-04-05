import cross from "../res/cross.png"
import done from "../res/done.png"
import "../../styles/goals/Goal.css"

const Goal = function(props) {

    let goal = props.goal
    let index = props.index

    return(
        <div id={"g" + index} className="goal">
            <p>Ціль: {goal.name}</p>
            <p>Дедлайн: {goal.deadline}</p>
            <p>Cтатус: {goal.status}</p>
            <div className="buttonLine">
                <button id={"g" + index + "d"} className="gButton" onClick = {props.doneEvent}>
                    <img id={"g" + index + "i"}className="btnImg" src={done}/>
                </button>
                <button id={"g" + index + "c"} className="gButton" onClick = {props.crossEvent}>
                    <img id={"g" + index + "i"} className="btnImg" src={cross}/>
                </button>
            </div>
        </div>
    )
}

export default Goal