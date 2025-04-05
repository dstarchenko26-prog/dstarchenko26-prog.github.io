import "../../styles/goals/GoalsSection.css"
import addpng from "../res/add.png"
import GoalForm from "../forms/GoalForm"
import Goal from "../blocks/Goal"
import { useState } from "react"
const GoalsSection = function(props) {
  const[filter, setFilter] = useState(-2) 

  function openForm() {
    document.getElementById("goalForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("goalForm").style.display = "none";
  }

  window.onclick = function(event) {
    let form = document.getElementById("goalForm");
    if (event.target === form) {
      closeForm();
    }
  }

  let newGoals = copyArray()

  function copyArray() {
    let newGoals = []
    for (let c in props.goals) {
      newGoals.push(props.goals[c])
    }
    return newGoals
  }

  const addGoal = (newGoal) => {
    props.setGoals([...props.goals, newGoal])
    newGoals.push(newGoal)
    writeGoals(newGoals)
  }

  function writeGoals(newGoals) {
    let cg = localStorage.getItem("countGoals")
    localStorage.removeItem("countGoals")
    for (let i = 0; i < cg; i++) {
      localStorage.removeItem("gN" + i)
      localStorage.removeItem("gD" + i)
      localStorage.removeItem("gS" + i)
      localStorage.removeItem("gSS" + i)
    }
    localStorage.setItem("countGoals", newGoals.length);
    for (let g in newGoals) {
      localStorage.setItem("gN" + g, newGoals[g].name);
      localStorage.setItem("gD" + g, newGoals[g].deadline);
      localStorage.setItem("gS" + g, newGoals[g].s);
      localStorage.setItem("gSS" + g, newGoals[g].status);
    }
  }

  function doneEvent(event) {
    let i = event.target.id.slice(1, event.target.id.length - 1)
    newGoals = copyArray()
    if (newGoals[i].s != -1) {
      newGoals[i].s = 1
      newGoals[i].status = "досягнуто"
    }
    writeGoals(newGoals)
    props.setGoals(newGoals)

  }

  function crossEvent(event) {
    let ic = event.target.id.slice(1, event.target.id.length - 1)

    let newGoals = []
    for(let i in props.goals) {
      if (i != ic) {
        newGoals.push(props.goals[i])
      }
    }
    writeGoals(newGoals)
    props.setGoals(newGoals)
  }

  function filterEvent(event) {
    setFilter(event.target.value)
  }

  return (
    <section id="goals">
      <GoalForm create={addGoal}/>
      <h2>Мої цілі</h2>
      <div className="goalNavigation">
        <p>Тут ви можете побачити свої цілі:</p>
        <div id ="goalFilter">
          <label for="goalFilter" id="goalFilterLabel">Фільтрування: </label>
          <select id="goalFilterSelect" name="Filter" onChange={filterEvent}>
            <option value={-2}>Всі</option>
            <option value={0}>Виконуються</option>
            <option value={1}>Досягнуті</option>
            <option value={-1}>Прострочені</option>
          </select>
        </div>
      </div>
      <div className="goalList">
        {props.goals.filter(goal => goal.s == filter || filter == -2).map((goal, index) =>
          <Goal goal={goal} index={index} doneEvent={doneEvent} crossEvent={crossEvent}/>
        )}
        <div className="goal"><button id = "addButton" className = "addButton" onClick={openForm}><img src={addpng}></img></button></div>
      </div>
    </section>
  )
}

export default GoalsSection;