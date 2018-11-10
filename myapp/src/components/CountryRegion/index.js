import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import mobileRegion from './region'

const menuStyle = {
  'margin': '5px 0 0 -14px',
  'maxHeight': '200px',
  'overflow': 'auto',
}

class CountryRegion extends Component {
  state = {
    regionValue: '',
  }

  render() {
    let { regionValue } = this.state
    const { initialValue, onChange } = this.props;
    let self = this

    const handerChangeRegion = ({ item: { props } }) => {
      let { code } = props
      self.setState({
        regionValue: code,
      })
      onChange(code, props)
    }

    // 选择国家
    const renderMenuItem = mobileRegion.map((item) => {
      return (
        <Menu.Item key={item.shortName} code={item.code}>{item.fullName}</Menu.Item>
      )
    });
    const menuRegion = (
      <Menu style={menuStyle} onClick={handerChangeRegion}>{renderMenuItem}</Menu>
    )

    let value = regionValue;
    if (!value) {
      value = initialValue;
    }

    return (
      <Dropdown overlay={menuRegion}>
        <span>
          <span style={{ 'paddingRight': '5px' }}>+{value}</span>
          <Icon type="down" />
        </span>
      </Dropdown>
    )
  }
}

export default CountryRegion
