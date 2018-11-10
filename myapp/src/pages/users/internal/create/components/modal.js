import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Modal } from 'antd'
import { FilterItem } from 'components'
import _ from 'lodash'

const filterChildrenStyle = {
  lineHeight: '28px',
}

const filterItemStyle = {
  width: '200px',
}

// 账号信息确认弹窗
const MyModal = ({
  dispatch,
  createAccount: {
    modalShow,
    formData,
  },
}) => {
  const arraySplit = (arr) => {

    let arrayLen = arr.length
    let splitLen = 3
    let max = Math.ceil(arrayLen / splitLen)
    let splitArr = new Array(max).fill('')
    let res = []

    splitArr.reduce((a) => {
      a.push(parseInt(a[a.length - 1], 10) + parseInt(splitLen, 10))
      return a
    }, [0]).reduce((a, b) => {
      res.push(arr.slice(a, b))
      return b
    }, 0)

    return res
  }

  const renderList = (data) => {
    const arr = []

    const label = {
      realName: '姓名',
      mobile: '电话',
      email: '邮箱',
      roles: '权限',
    }
    _.forIn(data, (value, key) => {
      if (key !== 'mobileRegion') {
        if (key === 'mobile') {
          value = '+' + data.mobileRegion + '-' + data.mobile
        }
        arr.push({
          value,
          key,
        })
      }
    })

    return arr.map((item, index) => {
      return (
        <div key={`modal-list${index}`}>
          <FilterItem  label={label[item.key]} labelType="flexEnd" >
            <div style={filterItemStyle}>
              {item.key === 'roles' ?
                <div style={filterChildrenStyle}>
                  {arraySplit(item.value.map(_ => _.title)).map((_, index) => <div key={index}>{_.join('/')}</div>)}
                </div>
                : <span style={filterChildrenStyle}>{item.value}</span>}
            </div>
          </FilterItem>
        </div>
      )
    })
  }


  return (
    <Modal
      title="确认新账号信息"
      visible={modalShow}
      bodyStyle={
        {
          padding: "32px 120px",
        }
      }
      onOk={() => {
        dispatch({
          type: 'createAccount/createAccount',
          payload: {
            ...formData,
            roles: formData.roles.map(_ => _.key).toString(),
            mobileRegion: formData.mobileRegion.replace('+', ''),
          },
        })
      }}
      onCancel={
        () => {
          dispatch({
            type: 'createAccount/setModalHide',
          })
        }
      }
    >
      {renderList(formData)}
    </Modal>
  )
}

// modal.propTypes = {
//   // form: PropTypes.object.isRequired,
//   // type: PropTypes.string,
//   // item: PropTypes.object,
//   // onOk: PropTypes.func,
// }

export default connect(({ createAccount, loading }) => ({ createAccount, loading }))(MyModal)
 // export default MyModal
