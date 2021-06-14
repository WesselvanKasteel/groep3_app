import React from 'react';

class SearchBar extends React.Component{

    state = {searchTerm:""};

    onSearch = (event) => {
       this.setState({searchTerm: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm);
    }

    // ability suggestions input box
    // type suggestions input box

    
    render(){
        return(
            <section className ='searchbar_section'>
                <form onSubmit={this.onSubmit}>
                    <input 
                    onChange={this.onSearch}
                    className='searchbar_section__input' 
                    placeholder='Functie,trefwoord' 
                    type="text"
                    value={this.state.searchTerm}/>
                    <input>
                    </input>
                    <button type="submit"></button>
                </form>
            </section>    
        );
    }
}

export default SearchBar;