import React from 'react';
import filterCountriesFunction from '../filterCountriesFunction';

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allCountries: [],
            matchedCountries: [],
            searchQuery: '',
            activeEl: -1,
            completionVisible: true,
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleCountryClick = this.handleCountryClick.bind(this);
        this.handleKeyDownClickOnFocusedInput = this.handleKeyDownClickOnFocusedInput.bind(this);
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json')
        .then(response => response.json())
        .then(data => {
            this.setState({allCountries: data});
        })
        .catch(error => console.error(error))
    }

    async handleSearchChange(e) {
        let searchQuery = e.target.value;
        let matchedCountries = searchQuery ?
            await filterCountriesFunction(this.state.allCountries, searchQuery)
                .then(matchedCountries => matchedCountries) :
            [];
        this.setState(prevState => ({
            searchQuery,
            matchedCountries,
            activeEl: -1,
        }));
    }

    handleCountryClick(e) {
        console.log(8);
        const searchQuery = e.target.innerText;
        this.setState({
            searchQuery,
            matchedCountries: [],
        });
    }

    handleKeyDownClickOnFocusedInput(e) {
        const {activeEl, matchedCountries} = this.state;
        if (e.keyCode === 38 && activeEl > 0) {
            this.setState( prevState => ({
                activeEl: prevState.activeEl - 1,
            }))
        } else if (e.keyCode === 40 && activeEl < matchedCountries.length - 1) {
            this.setState( prevState => ({
                activeEl: prevState.activeEl + 1,
            }))
        } else if(e.keyCode === 13 && matchedCountries) {
            this.handleCountryClick({
                target: {
                    innerText: matchedCountries[activeEl].country,
                }
            });
        }
    }

    render() {
        return (
            <>
                <input
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                    onKeyDown={this.handleKeyDownClickOnFocusedInput}
                    onFocus={e => this.setState({completionVisible:true})}
                    onBlur={e => this.setState({completionVisible:false})}
                />
                <ul onMouseDown={this.handleCountryClick}>
                    {this.state.completionVisible && this.state.matchedCountries.map((el, i) =>
                        <li key={el.country} className={`country ${this.state.activeEl === i ? 'active' : null}`}>{el.country}</li>
                    )}
                </ul>
            </>
        )
    }
}

export default Autocomplete;