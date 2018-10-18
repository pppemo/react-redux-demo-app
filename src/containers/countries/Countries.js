import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { loadCountry } from './actionCreators'
import { Panel } from 'react-bootstrap'
import CountrySearch from './../../components/CountrySearch/CountrySearch'
import CountryDetails from './../../components/CountryDetails/CountryDetails'
import styles from './Countries.module.scss'

class Countries extends Component {

  onCountryChanged = country => this.props.loadCountry(country.alpha3Code)

  render() {
    const { countries, currentCountryCode, isLoadingCountry } = this.props

    return <div>
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Learn more about world's
            countries</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <CountrySearch onSelected={this.onCountryChanged}/>
          {isLoadingCountry ? (<div className={styles.spinnerContainer}>
            <BeatLoader color={'gray'}/>
          </div>) : (
            currentCountryCode &&
            <CountryDetails countryDetails={countries[currentCountryCode]}/>
          )}
        </Panel.Body>
      </Panel>
    </div>
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
  currentCountryCode: state.countries.currentCountryCode,
  isLoadingCountry: state.countries.isLoadingCountry
})

export default connect(mapStateToProps, {
  loadCountry
})(Countries)
