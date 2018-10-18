import React from 'react'
import { mount } from 'enzyme'
import CountrySearch from './CountrySearch'
import styles from './CountrySearch.module.scss'

describe('CountrySearch component', () => {
  it('should render spinner', () => {
    const wrapper = mount(<CountrySearch/>)
    wrapper.setState({ isLoadingSuggestions: true })
    expect(wrapper.exists(`.${styles.searchSpinner}`)).toBe(true)
  })

  it('should not render spinner', () => {
    const wrapper = mount(<CountrySearch/>)
    expect(wrapper.exists(`.${styles.searchSpinner}`)).toBe(false)
  })
})
