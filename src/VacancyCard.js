import React from 'react';

const VacancyCard = (props) =>{

    return(
        <section>
            <img src={props.imgSrc} alt=""/>
            <h1>{props.name || "geen naam"}</h1> 
            <h1>{props.number || "geen nummer"}</h1>
            {props.skills.map(skill => <h1>{skill.skill}</h1>)}
            {/* {props.abilities.map(ability => <li>{ability.ability.name}</li>)} */}
            <button>GO</button>

        </section>
    )
    
}
export default VacancyCard;