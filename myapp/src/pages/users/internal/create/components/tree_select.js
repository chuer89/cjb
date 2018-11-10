import React, { Component } from 'react'
import { Tree, Row, Col, Button, Spin } from 'antd'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import { Iconfont } from 'component'
import { arrayToTree } from 'utils'
import styles from './tree_select.less'

const { TreeNode } = Tree

const renderTreeNodes = (data, prefix) => {
  return data.map((item) => {
    if (!item) {
      return null
    }
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children, prefix)}
        </TreeNode>
      )
    }

    return <TreeNode {...item} />
  })
}

const treeToArray = (data) => {
  const result = []
  const changefunc = (tree, pkey) => {
    tree.forEach((item) => {
      if (item.children) {
        changefunc(item.children, item.key)
      }
      result.push({
        pkey: pkey,
        title: item.title,
        key: item.key,
      })
    })
  }

  changefunc(data, null)
  return result
}


const filterTreeData = (select, target, needP = true) => {
  const reslut = []
  const pkey = []
  let selectParents = []

  // 当前选中的元素
  const selects = target.filter((item) => {
    if (select.includes(item.key + '')) {
      findParent(item)
      return true
    } else {
      return false
    }
  })

  // 当前选中元素的上级元素
  function selectP(pkey) {
    return target.filter((item) => {
      if (item.key === pkey) {
        selectParents.push(item)
        return true
      } else {
        return false
      }
    })[0]
  }

  function findParent(item) {
    if (item.pkey) {
      pkey.push(item.pkey)
      const p = selectP(item.pkey)
      findParent(p)
    }
  }
  // 如果需要父级
  if (needP) {
    return _.uniq(reslut.concat(selects, selectParents))
  } else {
    return _.uniq(selects)
  }

}

const createTreeKey = (key = '', prefix = '') => {
  let newKey = `${prefix}Tree${_.random(0, 100)}`
  if (newKey === key) {
    return createTreeKey(newKey)
  } else {
    return newKey
  }
}

class TreeSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rightSelected: new Set(), // 右边打勾的
      leftSelected: new Set(), // 左边打勾的
      currentSelect: new Set(), // 当前选中的， 用来筛选左边的数据
      targetData: [],
      leftkey: createTreeKey('', 'left'),
      rightkey: createTreeKey('', 'right'),
      hasAction: false, // 是否有过操作
    }
  }

  soloArr = () => {
    return treeToArray(this.props.createAccount.treeData)
  }

  // 验证
  errorTest = () => {
    const currentSelect = Array.from(this.state.currentSelect)
    let mustHaskefu = false
    let hasError = false
    let msg = '请选择权限'
    let offlineCode = '10' // 地推
    let customerCode = '20' // 客服
    let raiseCode = '80' // 畜牧客服

    if (currentSelect.includes(offlineCode)) { // 如果选择地推 则必须有客服
      mustHaskefu = !currentSelect.includes(customerCode)
      if (mustHaskefu) {
        msg = '选择地推权限后，必须选择客服权限！'
      }
    }

    // 如果选择了畜牧客服，不能选择 地推和客服
    if (currentSelect.includes(raiseCode)) {
      if (currentSelect.includes(customerCode) || currentSelect.includes(offlineCode)) {
        hasError = true
        msg = '"畜牧客服"不能同"地推"和"客服"同时存在！'
      }
    }


    const isRequired = !this.state.targetData.length && (this.props.createAccount.clickSumbit || this.state.hasAction)

    return {
      error: (isRequired || mustHaskefu || hasError),
      msg: msg,
    }

  }

  setAuthority = () => {
    this.props.dispatch({
      type: 'createAccount/setAuthority',
      payload: {
        authorityIsOk: !this.errorTest().error,
      },
    })
  }

  onLeft = () => {
    // 当前state保存的数据 currentSelect是set数据保证不出现相同的key
    const currentSelect = this.state.currentSelect
    // 右边当前选中的数据 把set对象转换成数组，方便遍历
    const rightkey = Array.from(this.state.rightSelected)
    // 右边只能添加不能删除
    // 把右边的数据加到当前选择之中
    rightkey.forEach((key) => {
      currentSelect.add(key)
    })
    // 筛选数据并且将筛选出来的数据组装成相应的树形结构
    const selectData = arrayToTree(filterTreeData(Array.from(currentSelect), this.soloArr()), 'key', 'pkey')
    this.setCurrentSelect(selectData, currentSelect)
  }

  onRight = () => {
    // 反向diff出需要删除后剩下的元素
    const currentSelect = _.difference(Array.from(this.state.currentSelect), Array.from(this.state.leftSelected))

    const selectData = arrayToTree(filterTreeData(currentSelect, this.soloArr()), 'key', 'pkey')

    this.setCurrentSelect(selectData, currentSelect)
  }

  // 更新state 更新左右两侧tree组件的key值 消除选中的状态
  setCurrentSelect = (selectData, currentSelect) => {
    this.setState({
      rightkey: createTreeKey(this.state.leftkey, 'right'),
      leftkey: createTreeKey(this.state.leftkey, 'left'),
      targetData: selectData,
      rightSelected: new Set(),
      leftSelected: new Set(),
      currentSelect: new Set(currentSelect),
      hasAction: true,
    }, () => {
      this.props.onChange(filterTreeData(Array.from(this.state.currentSelect), this.soloArr(), false))
      this.setAuthority()
    })
  }

  onSelect = (keys, type) => {
    if (type === 'right') {
      this.setState({ rightSelected: keys })
    } else {
      this.setState({ leftSelected: keys })
    }
  }

  render({ loading } = this.props) {
    const rightTreeData = this.props.createAccount.treeData
    const targetData = this.state.targetData
    const targetDataLen = targetData.length
    const rightTreeDataLen = rightTreeData.length
    const isError = this.errorTest()

    return (
      <div className={styles.treeContainer}>
        <Row type="flex" className={isError.error ? styles.error : ''}>
          <Col >
            <p className={styles.title}>当前角色及权限</p>
            {targetDataLen
              ? <Tree
                checkable
                defaultExpandAll
                onCheck={(selectedKeys) => {
                  this.onSelect(selectedKeys, 'left')
                }}
                key={this.state.leftkey}
                className={styles.treeListLeft}
              >{renderTreeNodes(targetData, 'left')}</Tree>
              : <div className={styles.treeListLeft}></div>}
          </Col>
          <Col className={styles.activeContainer}>
            <Button className="tree-btn" onClick={this.onLeft} shape="circle" icon="left" />
            <Button className="tree-btn" onClick={this.onRight} shape="circle" icon="right" />
          </Col>
          <Col >
            <p className={styles.title}>可选角色及权限</p>
            {rightTreeDataLen
              ? <Tree
                checkable
                defaultExpandAll
                key={this.state.rightkey}
                className={styles.treeListRight}
                onCheck={(selectedKeys) => {
                  this.onSelect(selectedKeys, 'right')
                }}>{renderTreeNodes(rightTreeData, 'right')}</Tree>
              : <Spin spinning={loading.effects['createAccount/getTreeSelectData']} delay={500} />}
          </Col>
        </Row>
        {isError.error ? <span className={styles.errText}>{isError.msg}</span> : ''}
      </div>
    )
  }
}

TreeSelect.propTypes = {
  internalAccount: PropTypes.object,
  loading: PropTypes.object,
  onChange: PropTypes.func,
}

export default connect(({ createAccount, loading }) => ({ createAccount, loading }))(TreeSelect)
