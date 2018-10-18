import TestRenderer from 'react-test-renderer'
import React from 'react'
import { shallow } from 'enzyme'
import RecentSearches from './RecentSearches'
import styles from './RecentSearches.module.scss'

const searches = [{
  name: 'Poland',
  code: 'PL'
}, {
  name: 'Germany',
  code: 'DE'
}]

describe('RecentSearches component', () => {
  it('should render with recent searches', () => {
    const tree = TestRenderer
      .create(<RecentSearches searches={searches}
        label="Component label" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render without recent searches', () => {
    const tree = TestRenderer
      .create(<RecentSearches label="Component label" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should trigger search', () => {
    const onSelected = jest.fn()
    const wrapper = shallow(<RecentSearches searches={searches}
      onSelected={onSelected} />)
    wrapper.find(`.${styles.label}`).first().simulate('click')
    expect(onSelected).toBeCalled()
  })
})
