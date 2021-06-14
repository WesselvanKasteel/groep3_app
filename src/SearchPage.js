import React from 'react';
import SearchBar from './SearchBar';
import VacancyList from './VacancyList';
import axios from 'axios';

class SearchPage extends React.Component{

    state = { name: "", img:"",number:"", abilities:[],list:[]};

    // state = { job_title:"", job_skills:[], job_adress:"", (meer als het moet)};
    

    onSubmit = (searchTerm) =>{
        const BASE_URL ="https://pokeapi.co/api/v2/pokemon/";
        axios.get(BASE_URL + searchTerm).then(res =>{
            console.log(res)
            this.setState({
                name: res.data.name.charAt(0).toUpperCase()+ res.data.name.slice(1),
                number: res.data.id,
                img: res.data.sprites.front_default,
                abilities: res.data.abilities,
            });
        });
    }

    render(){
        console.log(this.state.abilities)
        return(
            <article>
                <SearchBar onSubmit={this.onSubmit}/>
                <VacancyList name={this.state.name} number={this.state.number} imgSrc={this.state.img} abilities={this.state.abilities}/>               
            </article>
        ); 
    }
}


export default SearchPage;