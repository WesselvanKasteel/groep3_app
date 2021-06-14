import React from 'react';

class SearchBarSkill extends React.Component{

    state = {searchTerm:"", pokemons: []};

    onSearch = (event) => {
       this.setState({searchTerm: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm);
        console.log(this.state.searchTerm)
    }

    getTypesList = (event) => {
        event.preventDefault();
        this.props.getPokemon(this.state.pokemons);
        console.log(this.state.pokemons);
    }
    
    
    render(){
        return(
            <section className ='searchbar_section'>
                <form onSubmit={this.onSubmit}>
                    <select value="pokemons" onChange={this.getTypesList}>
                        {this.state.pokemons.map(pokemon=> <option value={pokemon.name}>{pokemon.name}</option>)}
                    </select>
                
                    
                    <button type="submit">submit</button>
                </form>
            </section>    
        );
    }
}

export default SearchBarSkill;