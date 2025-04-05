import { useEffect, useState } from "react"
import "../../styles/achievements/Achievement.css"
import img1 from "../res/achievement1.png"
import img2 from "../res/achievement1+.png"
import img3 from "../res/achievement2.png"
import img4 from "../res/achievement2+.png"
import img5 from "../res/achievement3.png"
import img6 from "../res/achievement3+.png"
import img7 from "../res/achievement4.png"
import img8 from "../res/achievement4+.png"


const Achievement = function(props) {
    let images= [
        img1, img2, img3, img4, img5, img6, img7, img8
    ]
    const [status, setStatus] = useState("0%")
    let index = props.index + 1
    const [imageIndex, setImageIndex] = useState(index * 2 - 2)

    useEffect(() =>
    {
        let cg = countG(-2)
        if (cg > 0) {
            if (index == 1) {
                if (countG(1) > 0) {
                    setStatus("Досягнуто")
                    setImageIndex(index * 2 - 1)
                }
            } else if (index == 2) {
                if (countG(1) > 9) {
                    setStatus("Досягнуто")
                    setImageIndex(index * 2 - 1)
                } else {
                    setStatus("" + countG(1) * 10 + "%")
                }
            } else if (index == 3) {
                if (countG(1) > 99) {
                    setStatus("Досягнуто")
                    setImageIndex(index * 2 - 1)
                } else {
                    setStatus("" + countG(1) + "%")
                }
            } else {
                if (countG(-1) > 0) {
                    setStatus("Досягнуто")
                    setImageIndex(index * 2 - 1)
                }
            }
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

    return(
        <div className="achievement" id={"ach" + index}>
            <img className="achImg" src={images[imageIndex]}/>
            <div>
                <h4>{props.ach.name}</h4>
                <p>{props.ach.desc}</p>
                <p>Статус: {status}</p>
            </div>
        </div>
    )
}

export default Achievement