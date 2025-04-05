import { useState } from "react";
import "../../styles/goals/GoalForm.css"

const GoalForm = function({create}) {
    const [goal, setGoal] = useState({name: "", deadline: "", s: "", status: ""})

    function closeForm() {
        document.getElementById("goalForm").style.display = "none";
    }

    function submit(event) {
        event.preventDefault();
    
        let gN = document.getElementById("goalName").value;
        let dL = document.getElementById("deadline").value;
    
        let newGoal = {
            name: gN,
            deadline: dL,
            s: setStatus(dL),
            status: setStatus(dL) == 0 ? "виконується" : "прострочено"
        };
    
        create(newGoal)
        setGoal(newGoal)
        document.getElementById("f1").reset();
        closeForm()
    };
    
    function setStatus(dL){
        let today = new Date().toISOString().split('T')[0];
        if (dL >= today)
            return 0;
        else
            return -1;
    }

    return(
        <div id="goalForm" className="form1">
            <div className="form-content">
                <span className="close" onClick={closeForm}>&times;</span>
                <h2>Додавання цілі</h2>
                <form id="f1" onSubmit={submit}>
                    <label for="goalName">Назва цілі: </label>
                    <input type="goalName" id="goalName" name="goalName" required/>
                    <hr></hr>
                  
                    <label for="deadline">Дедлайн: </label>
                    <input type="date" id="deadline" name="deadline" required/>
                    <hr></hr>
                    <button type="submit" className="sumbit">Додати</button>
                </form>
            </div>
        </div>
    )
}

export default GoalForm;