import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { loadCountry } from './actionCreators'
import { Panel } from 'react-bootstrap'
import CountrySearch from './../../components/CountrySearch/CountrySearch'
import CountryDetails from './../../components/CountryDetails/CountryDetails'
import RecentSearches from './../../components/RecentSearches/RecentSearches'
import * as CountriesSelectors from './selectors'
import styles from './Countries.module.scss'

class Countries extends Component {

  onCountryChanged = country => this.props.loadCountry(country.alpha3Code)

  shouldShowRecentSearches = () => !!this.props.recentSearches.length

  render() {
    const { currentCountry, isLoadingCountry, recentSearches } = this.props

    return <div>
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Learn more about world's
            countries</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <CountrySearch onSelected={this.onCountryChanged}/>
          {this.shouldShowRecentSearches() &&
          <RecentSearches label="Countries recently searched"
            searches={recentSearches}
            onSelected={this.props.loadCountry}
          />}
          {isLoadingCountry ? (<div className={styles.spinnerContainer}>
            <BeatLoader color={'gray'}/>
          </div>) : (
            currentCountry &&
            <CountryDetails countryDetails={currentCountry}/>
          )}
        </Panel.Body>
      </Panel>
    </div>
  }
}

const mapStateToProps = (state) => ({
  currentCountry: CountriesSelectors.currentCountry(state),
  isLoadingCountry: state.countries.isLoadingCountry,
  recentSearches: CountriesSelectors.recentSearches(state),
})

export default connect(mapStateToProps, {
  loadCountry
})(Countries)
