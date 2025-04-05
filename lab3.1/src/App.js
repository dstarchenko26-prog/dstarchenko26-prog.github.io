import { useEffect, useState, useLayoutEffect } from "react";
import Section from "./components/Section";
import "./styles/App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("main")
  const [sizeHeader, setSizeHeader] = useState("0px")
  const [description, setDescription] = useState("")
  const [goals, setGoals] = useState(readGoals)
  const [community, setCommunity] = useState(readCommunity)

  window.addEventListener("resize", resizeHeader);

  function resizeHeader() {
    setSizeHeader("" + (document.getElementsByTagName("header")[0].clientHeight * 1.01) + "px")
  }

  useEffect(() => {
    document.getElementsByTagName("main")[0].style.paddingTop = sizeHeader
  }, [sizeHeader]);

  useLayoutEffect(() => {
    resizeHeader()
    let items = document.querySelectorAll(".menu-item");
    items.forEach(item => {
      item.addEventListener("mouseover", function() {
        setDescription(this.dataset.desc);
      });

      item.addEventListener("mouseout", function() {
        setDescription("");
      });
    });
  });

  function openMain() {
    setCurrentPage("main")
  }

  function openGoals() {
    setCurrentPage("goals")
  }

  function openProgress() {
    setCurrentPage("progress")
  }

  function openCommunity() {
    setCurrentPage("community")
  }

  function readGoals() {
    let newGoals = []
    for (let i = 0; i < localStorage.getItem("countGoals"); i++) {
      let n = localStorage.getItem("gN" + i);
      let d = localStorage.getItem("gD" + i);
      let s = localStorage.getItem("gS" + i);
      let ss = localStorage.getItem("gSS" + i);  
      let goal = {
        name: n,
        deadline: d,
        s: s,
        status: ss
      };
      newGoals.push(goal);
    }
    for (let g in newGoals) {
      if (newGoals[g].s == 0) {
        newGoals[g].s = setStatus(newGoals[g].deadline);
        newGoals[g].status = newGoals[g].s == 0 ? "виконується" : "прострочено"
      }
    }
    return newGoals;
  }

  function setStatus(dL){
    let today = new Date().toISOString().split('T')[0];
    if (dL >= today)
      return 0;
    else
      return -1;
    }

  function readCommunity() {
    let newCommunity = []
    for (let i = 0; i < localStorage.getItem("countCommunity"); i++) {
      newCommunity.push(localStorage.getItem("c" + i));
    }
    return newCommunity
  }

  return (
    <div className="App">
      <header onResize={resizeHeader}>
	      <h1>Менеджер з досягнення цілей</h1>
        <nav>
          <ul>
            <li className="menu-item" data-desc="Переміщає вас до головної сторінки" onClick={openMain}>Головна</li>
            <li className="menu-item" data-desc="Переміщає вас до сторінки з вашими цілями" onClick={openGoals}>Мої цілі</li>
            <li className="menu-item" data-desc="Відображає ваші досягнення" onClick={openProgress}>Прогрес</li>
            <li className="menu-item" data-desc="Переміщає вас до спільноти" onClick={openCommunity}>Спільнота</li>
          </ul>
          <p id="description" className="desc">{description}</p>
        </nav>
      </header>
      <main><Section id={currentPage} goals={goals} setGoals={setGoals} community={community} setCommunity={setCommunity}/></main>
      <footer>
      <p>© ОІ-24 Старченко Денис</p>
      </footer>
    </div>
  );
}

export default App;