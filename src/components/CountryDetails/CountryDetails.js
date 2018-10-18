import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Table } from 'react-bootstrap'
import styles from './CountryDetails.module.scss'

const CountryDetails = ({ countryDetails }) => {
  const { name, capital, flag, timezones, region, currencies, languages, alpha3Code } = countryDetails

  return (
    <div>
      <h1>{name}</h1>
      <Row>
        <Col sm={6}>
          <Table responsive>
            <tbody>
            <tr>
              <td><b>Alpha code</b></td>
              <td>{alpha3Code}</td>
            </tr>
            <tr>
              <td><b>Region</b></td>
              <td>{region}</td>
            </tr>
            <tr>
              <td><b>Capital</b></td>
              <td>{capital}</td>
            </tr>
            <tr>
              <td><b>Timezones</b></td>
              <td>{timezones.join(', ')}</td>
            </tr>
            <tr>
              <td><b>Currencies</b></td>
              <td>{currencies.map(currency => (
                <div key={currency.code}>{currency.name} ({currency.code})</div>
              ))}</td>
            </tr>
            <tr>
              <td><b>Languages</b></td>
              <td>{languages.map(language => language.name).join(', ')}</td>
            </tr>
            </tbody>
          </Table>
        </Col>
        <Col sm={6}>
          <div className={styles.countryFlag}>
            <img alt="Flag" src={flag}/>
          </div>
        </Col>
      </Row>
    </div>
  )
}

CountryDetails.propTypes = {
  countryDetails: PropTypes.shape({
    name: PropTypes.string,
    capital: PropTypes.string,
    flag: PropTypes.string,
    region: PropTypes.string,
    timezones: PropTypes.arrayOf(PropTypes.string),
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        symbol: PropTypes.string
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        iso639_1: PropTypes.string,
        iso639_2: PropTypes.string,
        name: PropTypes.string,
        nativeName: PropTypes.string
      })
    ),
    alpha3Code: PropTypes.string
  }).isRequired
}

export default CountryDetails
