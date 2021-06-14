import React from 'react';

class SearchBarName extends React.Component{

    state = {searchTerm:"",};

    onSearch = (event) => {
       this.setState({searchTerm: event.target.value});
       
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm);
    }
    

    // type suggestions input box
    
    
    render(){
        console.log(this.state.searchTerm);
        return(
            <section className ='searchbar_section'>
                <form onSubmit={this.onSubmit}>
                    <input 
                    onChange={this.onSearch}
                    className='searchbar_section__input' 
                    placeholder='Functie,trefwoord' 
                    type="text"
                    value={this.state.searchTerm}/>
                    
                    <button type="submit"></button>
                </form>
            </section>    
        );
    }
}

export default SearchBarName;