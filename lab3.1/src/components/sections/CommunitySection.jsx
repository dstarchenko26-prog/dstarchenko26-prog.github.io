import CText from "../blocks/CText"
import "../../styles/community/CommunitySection.css"

const CommunitySection = function(props) {
  let newCommunity = copyArray()

  function copyArray() {
    let newCommunity = []
    for (let c in props.community){
      newCommunity.push(props.community[c])
    }
    return newCommunity
  }

  function inputCText() {
    newCommunity.push(document.getElementById("textInput").value)
    props.setCommunity([...props.community, document.getElementById("textInput").value])
    document.getElementById("textInput").value = ''
    writeCommunity()
  }

  function writeCommunity() {
    let cc = localStorage.getItem("countCommunity")
    for (let i = 0; i < cc; i++) {
      localStorage.removeItem("c" + i)
    }
    localStorage.removeItem("countCommunity")
    localStorage.setItem("countCommunity", newCommunity.length);
    for (let i = 0; i < newCommunity.length; i++) {
      localStorage.setItem("c" + i, newCommunity[i]);
    }
  }

  return (
    <section id="community">
      <h2>Спільнота</h2>
      <p>Тут ви можете знайти поради від інших користувачів:</p>
      <div class="ctextList">
        {props.community.map(com => 
          <CText com={com}/>
        )}
      </div>        
      <input type="textarea" class="ctextInput" id="textInput" placeholder="Залиште своє повідомлення тут..."/>
      <button class="ctBTN" onClick={inputCText}>Залишити повідомлення</button>
    </section>
  )
}

export default CommunitySection;