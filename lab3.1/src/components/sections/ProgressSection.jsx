import { useEffect, useState } from "react"
import "../../styles/achievements/ProgressSection.css"
import Achievement from "../blocks/Achievement"

const ProgressSection = function(props) {
  let achievements = [
    {name: "Перші кроки!", desc: "Досягнути першу ціль"},
    {name: "Вперед до досягнень!", desc: "Досягнути 10 цілей"},
    {name: "Вас не спинити!", desc: "Досягнути 100 цілей"},
    {name: "Сонько!", desc: "Прострочити 1 ціль"}
  ]
  const [done, setDone] = useState(0)
  const [cross, setCross] = useState(0)
  const [process, setProcess] = useState(0)
  
  useEffect(() => {
    let cg = countG(-2)
    let cdg = countG(1)
    let ccg = countG(-1)
    let cpg = countG(0)
    if (cg > 0) {
      setDone("" + cdg + " (" + (cdg * 100 / cg).toFixed(2) + "%)")
      setCross("" + ccg + " (" + (ccg * 100 / cg).toFixed(2) + "%)")
      setProcess("" + cpg + " (" + (cpg * 100 / cg).toFixed(2) + "%)")
    }
  })

  function countG(c) {
    if (c == -2)
      return props.goals.length
    else {
      let count = 0
      for (let i in props.goals) {
        if (props.goals[i].s == c) {
          count++
        }
      }
      return count
    }
  }

  return (
    <section id="progress">
      <h2>Прогрес</h2>
      <h3>Ваші досягнення:</h3>
      <div className="achievements">
        {achievements.map((ach, index) =>
          <Achievement goals={props.goals} index={index} ach={ach}/>
        )}
      </div>
      <h3>Статистика цілей:</h3>
      <div className="statistics">
        <p id="st5">Досягнуто - {done}</p>
        <p id="st6">Прострочено - {cross}</p>
        <p id="st7">В процесі - {process}</p>
      </div>
    </section>
  )
}

export default ProgressSection;