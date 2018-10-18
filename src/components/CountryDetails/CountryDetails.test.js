import TestRenderer from 'react-test-renderer'
import React from 'react'
import CountryDetails from './CountryDetails'

describe('CountryDetails component', () => {
  it('should render details', () => {
    const details = {
      currencies: [
        {
          code: "FKP",
          name: "Falkland Islands pound",
          symbol: "£"
        }
      ],
      languages: [
        {
          iso639_1: "en",
          iso639_2: "eng",
          name: "English",
          nativeName: "English"
        }
      ],
      flag: "https://restcountries.eu/data/flk.svg",
      name: "Falkland Islands (Malvinas)",
      alpha3Code: "FLK",
      capital: "Stanley",
      region: "Americas",
      timezones: [
        "UTC-04:00"
      ]
    }

    const tree = TestRenderer
      .create(<CountryDetails countryDetails={details} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
