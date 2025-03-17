let goals = [];
let community = [];

readStorage();

function openForm1() {
    document.getElementById("goalForm").style.display = "block";
}

function closeForm1() {
    document.getElementById("goalForm").style.display = "none";
}

window.onclick = function(event) {
    let form = document.getElementById("goalForm");
    if (event.target === form) {
        closeForm1();
    }
}

document.getElementById("f1").addEventListener("submit", function(event) {
    event.preventDefault();

    let gN = document.getElementById("goalName").value;
    let dL = document.getElementById("deadline").value;

    let newGoal = {
        name: gN,
        deadline: dL,
        s: setStatus(dL),
        status: setStatus(dL) == 0 ? "виконується" : "прострочено"
    };

    goals.push(newGoal);

    this.reset();
    closeForm1();

    updateGoalList();
});

function updateGoalList() {
    let goalList = document.getElementsByClassName("goalList")[0];
    goalList.innerHTML = "";
    let id = 0;
    for (g in goals) {
        let goal = document.createElement("div");
        goal.id = "g" + id;
        goal.className = "goal";
        let gN = document.createElement("p");
        let gD = document.createElement("p");
        let gS = document.createElement("p");
        gN.textContent = "Ціль: " + goals[g].name;
        gD.textContent = "Дедлайн: " + goals[g].deadline;
        gS.textContent = "Cтатус: " + goals[g].status;
        goal.appendChild(gN);
        goal.appendChild(gD);
        goal.appendChild(gS);
        let bL = document.createElement("div");
        bL.className = "buttonLine";
        let d = document.createElement("button");
        let c = document.createElement("button");
        d.id = "g" + id + "d";
        c.id = "g" + id + "c";
        d.className = "gButton";
        c.className = "gButton";
        let imgD = document.createElement("img");
        imgD.src = "res/done.png";
        let imgC = document.createElement("img");
        imgC.src = "res/cross.png";
        if (goals[g].s == 0) {
            d.addEventListener("click", doneEvent);
        }
        c.addEventListener("click", crossEvent);
        d.appendChild(imgD);
        c.appendChild(imgC);
        bL.appendChild(d);
        bL.appendChild(c);
        goal.appendChild(bL);
        goalList.appendChild(goal);
        id++;
    }
    let goal = document.createElement("div");
    goal.id = "g" + id;
    goal.className = "goal";
    let btn = document.createElement("button");
    btn.id = "addButton";
    btn.className = "addButton";
    btn.addEventListener("click", openForm1);
    let img = document.createElement("img");
    img.src = "res/add.png";
    btn.appendChild(img);
    goal.appendChild(btn);
    goalList.appendChild(goal);
    updateStatistics();
    updateStorage();
}

function crossEvent(){
    i = this.id.slice(1, this.id.length - 1);
    goals.splice(i,1);
    updateGoalList();
}

function setStatus(dL){
    let today = new Date().toISOString().split('T')[0];
    if (dL >= today)
        return 0;
    else
        return -1;
}

function doneEvent(){
    i = this.id.slice(1, this.id.length - 1);
    goal = goals[i];
    goal.s = 1
    goal.status = "досянуто";
    updateGoalList();
}

function updateStatistics() {
    let countGoals = goals.length;
    let countDG = counterG(1);
    let countPG = counterG(0);
    let countCG = counterG(-1);
    if (countDG >= 1) {
        document.getElementById("st1").textContent = "Статус: отримано";
        document.getElementById("ach1").childNodes[1].childNodes[0].src = "res/achievement1+.png";
        if (countDG >= 10) {
            document.getElementById("st2").textContent = "Статус: отримано";
            document.getElementById("ach2").childNodes[1].childNodes[0].src = "res/achievement2+.png";
            if (countDG >= 100) {
                document.getElementById("st3").textContent = "Статус: отримано";
                document.getElementById("ach3").childNodes[1].childNodes[0].src = "res/achievement3+.png";
            } else {
                document.getElementById("st3").textContent = "Статус: " + countDG + "%";
                document.getElementById("ach3").childNodes[1].childNodes[0].src = "res/achievement3.png";
            }
        } else {
            document.getElementById("st2").textContent = "Статус: " + countDG * 10 + "%";
            document.getElementById("ach2").childNodes[1].childNodes[0].src = "res/achievement2.png";
            document.getElementById("st3").textContent = "Статус: " + countDG + "%";
        }
    } 
    else {
        document.getElementById("st1").textContent = "Статус: 0%";
        document.getElementById("ach1").childNodes[1].childNodes[0].src = "res/achievement1.png";
        document.getElementById("st2").textContent = "Статус: 0%";
        document.getElementById("st3").textContent = "Статус: 0%";
    }
    if (countCG >= 1) {
        document.getElementById("st4").textContent = "Статус: отримано";
        document.getElementById("ach4").childNodes[1].childNodes[0].src = "res/achievement4+.png";
    } else {
        document.getElementById("st4").textContent = "Статус: 0%";
        document.getElementById("ach4").childNodes[1].childNodes[0].src = "res/achievement4.png";
    }
    if (countGoals == 0) {
        document.getElementById("st5").textContent = "Досягнуто - 0";
        document.getElementById("st6").textContent = "Прострочено - 0";
        document.getElementById("st7").textContent = "В процесі - 0";
    } else {
        document.getElementById("st5").textContent = "Досягнуто - " + countDG + " (" + (countDG / countGoals * 100).toFixed(2) + "%)";
        document.getElementById("st6").textContent = "Прострочено - " + countCG + " (" + (countCG / countGoals * 100).toFixed(2) + "%)";
        document.getElementById("st7").textContent = "В процесі - " + countPG + " (" + (countPG / countGoals * 100).toFixed(2) + "%)";
    }
}

function counterG (s) {
    g = goals.filter(goal => goal.s == s);
    return g.length
}

function updateStorage() {
    resetStorage()
    writeStorage()
}

function resetStorage() {
    localStorage.clear();
}

function writeStorage() {
    localStorage.setItem("countGoals", goals.length);
    for (g in goals) {
        localStorage.setItem("gN" + g, goals[g].name);
        localStorage.setItem("gD" + g, goals[g].deadline);
        localStorage.setItem("gS" + g, goals[g].s);
        localStorage.setItem("gSS" + g, goals[g].status);
    }
    localStorage.setItem("countCommunity", community.length);
    for (c in community) {
        localStorage.setItem("c" + c, community[c]);
    }
}

function readStorage() {
    for (i = 0; i < localStorage.getItem("countGoals"); i++) {
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
        goals.push(goal);
    }
    for (i = 0; i < localStorage.getItem("countCommunity"); i++) {
        community.push(localStorage.getItem("c" + i));
    }
    deadlineControl();
    updateGoalList();
    updateCommunity();
}

function updateCommunity() {
    let ctextList = document.getElementsByClassName("ctextList")[0];
    ctextList.innerHTML = "";
    for (c in community) {
        let ctext = document.createElement("div");
        let p = document.createElement("p");
        ctext.className = "ctext";
        p.textContent = community[c];
        ctext.appendChild(p);
        ctextList.append(ctext);
    }
    updateStorage();
}

function inputCText() {
    let text = document.getElementById("textInput").value;
    community.push(text);
    document.getElementById("textInput").value = "";
    updateCommunity();
}

function deadlineControl() {
    for (g in goals) {
        if (goals[g].s == 0) {
            goals[g].s = setStatus(goals[g].deadline);
            goals[g].status = goals[g].s == 0 ? "виконується" : "прострочено"
        }
    }
}

let items = document.querySelectorAll(".menu-item");
let description = document.getElementById("description");

    items.forEach(item => {
        item.addEventListener("mouseover", function() {
            description.textContent = this.dataset.desc;
        });

        item.addEventListener("mouseout", function() {
            description.textContent = "";
        });
    });

    function motivationReminder() {
        let messages = [
            "Ти ще маєш не виконані завдання!\nНе здавайся! Ти на правильному шляху! 💪",
            "Ти ще маєш не виконані завдання!\nКожен маленький крок — це прогрес!",
            "Ти ще маєш не виконані завдання!\nТвої цілі ближчі, ніж здається! 🔥",
            "Ти ще маєш не виконані завдання!\nРоби сьогодні те, за що подякуєш собі завтра! 🚀"
        ];
        
        let message = messages[Math.floor(Math.random() * messages.length)];
        alert(message);
    }
    
    setInterval(() => {
        let now = new Date();
        if (counterG(0) > 0) {
        motivationReminder();
        // if (now.getHours() === 20 && now.getMinutes() === 5) {
        //     motivationReminder();
        // }
        }
    }, 60000);