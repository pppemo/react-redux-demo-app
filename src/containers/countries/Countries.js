import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCountry } from './actionCreators'
import { Panel } from 'react-bootstrap'
import CountrySearch from './../../components/CountrySearch/CountrySearch'
import CountryDetails from './../../components/CountryDetails/CountryDetails'

class Countries extends Component {

  onCountryChanged = country => this.props.loadCountry(country.alpha3Code)

  render() {
    const { countries, currentCountryCode } = this.props

    return <div>
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Countries</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <CountrySearch onSelected={this.onCountryChanged}/>
          {currentCountryCode &&
            <CountryDetails countryDetails={countries[currentCountryCode]}/>}
        </Panel.Body>
      </Panel>
    </div>
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
  currentCountryCode: state.countries.currentCountryCode
})

export default connect(mapStateToProps, {
  loadCountry
})(Countries)
