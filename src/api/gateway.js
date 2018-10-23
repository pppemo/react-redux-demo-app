import axios from 'axios'

const client = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2'
})

export default {
  searchCountriesByName: countryName => client.get(
    `/name/${countryName}`, {
      params: {
        fields: 'name;alpha3Code'
      }
    }),
  getCountryDetailsByCode: countryCode => client.get(
    `/alpha/${countryCode}`, {
      params: {
        fields: 'name;alpha3Code;capital;flag;timezones;region;currencies;languages'
      }
    })
}
