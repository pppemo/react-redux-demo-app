import createReducer from './../../store/createReducer'
import {
  LOAD_COUNTRY,
  LOAD_COUNTRY_DONE,
  LOAD_COUNTRY_FAILED,
  SET_CURRENT_COUNTRY
} from './actions'

const initialState = {
  countries: {},
  isLoadingCountry: false,
  currentCountryCode: null,
  recentSearches: []
}

const prependCountryToRecentSearches = (country, recentSearches) =>
  [{ name: country.name, code: country.alpha3Code}].concat(recentSearches).slice(0,5)

export default createReducer(initialState, {
  [LOAD_COUNTRY]: state => ({
    ...state,
    isLoadingCountry: true
  }),
  [LOAD_COUNTRY_DONE]: (state, { country }) => ({
    ...state,
    isLoadingCountry: false,
    countries: {
      ...state.countries,
      [country.alpha3Code]: country
    },
    currentCountryCode: country.alpha3Code,
    recentSearches: prependCountryToRecentSearches(country, state.recentSearches)
  }),
  [LOAD_COUNTRY_FAILED]: (state) => ({
    ...state,
    isLoadingCountry: false
  }),
  [SET_CURRENT_COUNTRY]: (state, { countryCode }) => ({
    ...state,
    currentCountryCode: countryCode
  })
})
