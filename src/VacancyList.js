import React from 'react';

const VacancyList = (props) =>{

    return(
        <section>
            <h1>{props.name || "geen naam"}</h1> 
            <img src={props.imgSrc} alt=""/>
            <h1>{props.number || "geen nummer"}</h1>
            {/*  moves */}
            {/* {props.abilities.map(ability => <li>{ability.ability.name}</li>)} */}
            <button>GO</button>

        </section>
    )
    
}
export default VacancyList;