import React from 'react';
import SearchBarName from './SearchBarName';
import VacancyList from './VacancyList';
import axios from 'axios';
import SearchBarSkill from './SearchBarSkills';

class SearchPage extends React.Component{

    state = { searchTerm: "", pokemons: [], name: "", img:"",number:"", abilities:[] ,types:[]};

    // state = { job_title:"", job_skills:[], job_adress:"", (meer als het moet)};
    componentDidMount(){
        const BASE_URL ="https://pokeapi.co/api/v2/pokemon/";
        axios.get(BASE_URL).then(res =>{
            this.setState({
                pokemons: res.data.results
            });
            console.log(res)
        })
    }

    onChange = (event) => {
        this.setState({searchTerm: event.target.value});
        
     }

    onSubmit = (searchTerm) =>{
        const BASE_URL ="https://pokeapi.co/api/v2/pokemon/";
        axios.get(BASE_URL + searchTerm).then(res =>{
            this.setState({
                name: res.data.name.charAt(0).toUpperCase()+ res.data.name.slice(1),
                number: res.data.id,
                img: res.data.sprites.front_default,
                abilities: res.data.abilities,
            });
            console.log(res)
        });

    }

    onSubmitSkill = (searchTerm) =>{
        
        const BASE_URL ="https://pokeapi.co/api/v2/type/";
        axios.get(BASE_URL + searchTerm).then(res =>{
            this.setState({
                types: res.data.pokemon
            })
        })
        
        
    }

    render(){
        console.log(this.state.searchTerm)
        const filteredPokemons = this.state.pokemons.filter(pokemon =>{
            return pokemon.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !==-1;
        });
        return(
            <article>   
                    <input onChange={this.onChange}
                    placeholder="Functie, trefwoord"
                    type="text"
                    value={this.state.searchTerm}
                    />
                    <select onSubmit={this.onSubmit}>
                        {this.state.pokemons.map(pokemon=> <option value={pokemon.name}>{pokemon.name}</option>)}
                    </select>
                    <input type="submit" value="submit"/>
                {filteredPokemons.map(pokemon => <VacancyList name={pokemon.name}/>)}
            </article>
        ); 
    }
}


export default SearchPage;