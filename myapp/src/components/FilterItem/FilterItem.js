import React from 'react'
import PropTypes from 'prop-types'
import styles from './FilterItem.less'

const FilterItem = ({
  label = '',
  labelType = '',
  children,
}) => {
  const labelArray = label.split('')

  const renderLabel = (type) => {
    let reactDom = ""
    switch (type) {
      case 'flexEnd':
        reactDom = <div className={"labelCon " + styles.flexEnd}>
          {labelArray.map((item, index) => <span className="labelText" key={`${item}_${index}`}>{item}</span>)}
        </div>
        break
      default:
        reactDom = <div className={"labelCon " + styles.spaceBetween}>
          {labelArray.map((item, index) => <span className="labelText" key={`${item}_${index}`}>{item}</span>)}
        </div>
    }
    return reactDom
  }
  return (
    <div className={styles.filterItem}>
      {labelArray.length > 0
        ? renderLabel(labelType)
        : ''}
      <div className={styles.item}>
        {children}
      </div>
    </div>
  )
}

FilterItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
  labelType: PropTypes.string,
}

export default FilterItem
