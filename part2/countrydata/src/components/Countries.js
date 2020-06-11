import React from 'react'

const Country = ({ country, handleClick }) => {
    return (
        <>
            {country.name + " "}
            <button id={country.name} onClick={handleClick}>Show</button>
            <br />
        </>
    )
}

const Languages = ({ languages }) => {
    return (<ul>
        {
            languages.map(language => <li key={language.name}>{language.name}</li>)
        }</ul>)
}

const CountryInfo = ({ country }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <p>
                Capital: {country.capital}
                <br />
                Population: {country.population}
            </p>
            <h4>Languages</h4>
            <Languages languages={country.languages} />
            <img src={country.flag} height="100" alt="Flag" />
            <h4>Weather in {country.capital}</h4>
        </>
    )
}

const Countries = ({ countries, handleClick }) => {
    if (countries.length > 10) {
        return (<p>Too many matches, please be more specific.</p>)
    } else if (countries.length === 1) {
        return (
            <>
                <CountryInfo country={countries[0]} />
            </>
        )
    } else {
        return (
            <>
                {countries.map(
                    country => <Country country={country} key={country.name}
                        handleClick={handleClick} />
                )}
            </>
        )
    }

}

export default Countries