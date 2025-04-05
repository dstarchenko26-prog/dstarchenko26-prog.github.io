import MainSection from "./sections/MainSection"
import GoalsSection from "./sections/GoalsSection"
import ProgressSection from "./sections/ProgressSection"
import CommunitySection from "./sections/CommunitySection"

const Section = function(props) {
    if (props.id == 'main') {
        return (
            <MainSection/>
        )
    }
    if (props.id == 'goals') {
        return (
            <GoalsSection goals = {props.goals} setGoals = {props.setGoals}/>
        )
    }
    if (props.id == 'progress') {
        return (
            <ProgressSection goals = {props.goals} setGoals = {props.setGoals}/>
        )
    }
    if (props.id == 'community') {
        return (
            <CommunitySection community = {props.community} setCommunity = {props.setCommunity}/>
        )
    }
}

export default Section