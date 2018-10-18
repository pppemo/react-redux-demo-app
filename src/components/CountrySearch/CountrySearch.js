import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'
import {
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import Gateway from './../../api/gateway'
import Downshift from 'downshift'
import styles from './CountrySearch.module.scss'

class CountrySearch extends Component {
  static propTypes = {
    onSelected: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoadingSuggestions: false
    }
  }

  onInputValueChange = debounce(300, value => {
    this.setState({ isLoadingSuggestions: true })
    Gateway.searchCountriesByName(value)
      .then(response => this.setState({
        items: response.data,
        isLoadingSuggestions: false
      }))
      .catch(error => {
        const { status } = error.response
        if (status !== 404) { // if 404 kill silently - country not found
          alert(`There was an error: ${error}`)
          console.error(error)
        }
        this.setState({
          isLoadingSuggestions: false,
          items: []
        })
      })
  })

  render() {
    const { onSelected } = this.props
    const { items, isLoadingSuggestions } = this.state
    return (<Downshift
      onChange={selection => onSelected && onSelected(selection)}
      itemToString={item => (item ? item.name : '')}
      onInputValueChange={this.onInputValueChange}
    >
      {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex
        }) => (
        <div>
          <FormGroup bsSize="large">
            <FormControl {...getInputProps()} type="text"
              placeholder="Type country name..."/>
          </FormGroup>
          {(isOpen || isLoadingSuggestions) &&
          <div className={styles.suggestionsContainer}>
            <ListGroup {...getMenuProps()} className={styles.suggestions}>
              {isLoadingSuggestions ? (<ListGroupItem>
                  <BeatLoader
                    color={'gray'}
                  />
                </ListGroupItem>
              ) : items.slice(0, 9)
                .map((item, index) => (
                  <ListGroupItem
                    className={styles.suggestionItem}
                    {...getItemProps({
                      key: item.name,
                      index,
                      item
                    })}
                    active={highlightedIndex === index}
                  >
                    {item.name}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </div>}
        </div>
      )}
    </Downshift>)
  }
}

export default CountrySearch
