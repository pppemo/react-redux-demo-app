import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import Downshift from 'downshift'

class CountrySearch extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        alpha2Code: PropTypes.string.isRequired
      })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSelected: PropTypes.func
  }

  static defaultProps = {
    items: null,
    isLoading: false
  }

  render() {
    const { items, isLoading, onSelected } = this.props
    return (<Downshift
      onChange={selection => onSelected && onSelected(selection)}
      itemToString={item => (item ? item.name : '')}
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
          {(isOpen || isLoading) && <ListGroup {...getMenuProps()}>
            {isLoading ? (<ListGroupItem>
                <BeatLoader
                  color={'gray'}
                />
              </ListGroupItem>
            ) : items
              .map((item, index) => (
                <ListGroupItem
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
          </ListGroup>}
        </div>
      )}
    </Downshift>)
  }
}

export default CountrySearch
