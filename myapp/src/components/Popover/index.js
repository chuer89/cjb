import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import styles from './Popover.less'



const MyPopover = ({reason, actioner, text}) => {
  const content = <div>
                    <p>操作人员：{actioner}</p>
                    <p className={styles.popoverContent}>{reason}</p>
                  </div>
  return <Popover content={content} placement="top"><span className={styles.textPopover}>{text}</span></Popover>
}


MyPopover.propTypes = {
  reason: PropTypes.string,
  actioner: PropTypes.string,
  text: PropTypes.string,
}

export default MyPopover
