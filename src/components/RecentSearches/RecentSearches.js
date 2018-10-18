import React from 'react'
import { Label } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './RecentSearches.module.scss'

const RecentSearches = ({ label, searches, onSelected }) => (
  <div>
    <span>{label}{label && ': '}</span>
    {searches && searches.map(element => (
      <span key={element.code}>
        <h4 className={styles.labelSizer}>
          <Label className={styles.label}
            onClick={() => onSelected && onSelected(element.code)}>
            {element.name}
          </Label>
        </h4>
      </span>
    ))}
  </div>
)

RecentSearches.propTypes = {
  label: PropTypes.string,
  searches: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string
    })
  ),
  onSelected: PropTypes.func,
  onClose: PropTypes.func
}

export default RecentSearches
