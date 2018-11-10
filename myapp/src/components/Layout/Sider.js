import React from 'react'
import PropTypes from 'prop-types'
import { source } from 'config';
import styles from './Layout.less'
import Menus from './Menu'

const Sider = ({
  siderFold, location, changeTheme, navOpenKeys, changeOpenKeys, menu,
}) => {
  const menusProps = {
    menu,
    siderFold,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div>
      <div className={styles.logo}>
        {siderFold ? <img alt="logo" src={source.logoIcon} /> : <img alt="logo" src={source.logo} />}
      </div>
      <Menus {...menusProps} />
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
