import React from 'react';
import VacancyCard from './VacancyCard';
import axios from 'axios';

class TemporaryTest extends React.Component{
    state = { searchTerm:"", vacancyList: [], job_title:"", job_skills:[], job_adress:"", };
    componentDidMount(){
        const BASE_URL ="http://localhost:8000/api/vacancies";
        axios.get(BASE_URL).then(res =>{
            this.setState({
                vacancyList: res.data
            });
            console.log(res.data)
        })
    }

    onChange = (event) => {
        this.setState({searchTerm: event.target.value});    
    }


    render(){
        const filteredVacancies = (this.state.vacancyList).filter(vacancy =>{
            return vacancy.title.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !==-1;
        })
        return(
            <article>
                <input onChange={this.onChange}
                    placeholder="Bedrijfsnaam, vacature, zoekterm"
                    type="text"
                    value={this.state.searchTerm}/>
                {filteredVacancies.map(vacancy => <VacancyCard name = {vacancy.title} />)}
            </article>
        )
    }

}

export default TemporaryTest;