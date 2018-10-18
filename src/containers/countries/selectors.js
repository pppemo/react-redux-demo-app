import { createSelector } from 'reselect'

const currentCountryCodeSelector = state => state.countries.currentCountryCode
const countriesSelector = state => state.countries.countries
const recentSearchesSelector = state => state.countries.recentSearches

export const currentCountry = createSelector(
  [currentCountryCodeSelector, countriesSelector],
  (currentCountryCode, countries) =>
    currentCountryCode ? countries[currentCountryCode] : undefined
)

export const recentSearches = createSelector(
  recentSearchesSelector,
  recentSearches => [].concat(recentSearches).splice(0, 5)
)
