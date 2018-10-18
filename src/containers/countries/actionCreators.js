import {
  LOAD_COUNTRY,
  LOAD_COUNTRY_DONE,
  LOAD_COUNTRY_FAILED,
  SET_CURRENT_COUNTRY
} from './actions'
import Gateway from '../../api/gateway'
import buildAction from './../../store/buildAction'

export const loadCountry = countryCode =>
  (dispatch, getState) => {
    const state = getState()
    if(state.countries.countries[countryCode]) {
      dispatch(buildAction(SET_CURRENT_COUNTRY, { countryCode }))
    } else {
      dispatch(buildAction(LOAD_COUNTRY))
      Gateway.getCountryDetailsByCode(countryCode)
        .then(response => {
          dispatch(buildAction(LOAD_COUNTRY_DONE, {
            country: response.data
          }))
        })
        .catch(error => {
          dispatch(buildAction(LOAD_COUNTRY_FAILED))
          console.error(error)
          alert(`There was an error: ${error}`)
        })
    }
  }

