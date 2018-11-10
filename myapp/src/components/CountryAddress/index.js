import { Cascader } from 'antd'
import React, { Component } from 'react'
import _ from 'lodash'

class CountryAddress extends Component {
  state = {
    defaultAttr: {
      allowClear: true,
      changeOnSelect: true,
      expandTrigger: 'hover',
      placeholder: '请选择地址',
      options: [],
    },
  }

  render() {
    let { defaultAttr } = this.state
    let attribute = {}
    let { onChange, config } = this.props
    let cityList = JSON.parse(localStorage.getItem('cityList') || '[]')

    let getChildren = (list) => {
      let arr = []
      if (_.isArray(list)) {
        _.forEach(list, (item) => {
          let itemOpt = {
            value: item.id, label: item.name,
          }
          if (_.isArray(item.childList)) {
            itemOpt.children = getChildren(item.childList)
          }
          arr.push(itemOpt)
        })
      }
      return arr
    }
    let options = getChildren(cityList)

    _.extend(attribute, defaultAttr, config, {
      onChange(value) {
        onChange(value)
      },
      options,
    })
    return (
      <div>
        <Cascader {...attribute} />
      </div>
    )
  }
}

export default CountryAddress
