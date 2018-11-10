import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Modal, Icon} from 'antd';
import {EnhanceModal} from 'components'

class Putaway extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    putAwayShow: false
  }
  onPutaway = () => this.setState({putAwayShow: Symbol('')})
  handleOk = () => this.props.actions.onPutaway(this.props.record)

  render() {
    return (<>
        <a href="javascript:;" onClick={this.onPutaway} style={{paddingLeft: 10}}
           key={`putaway_${this.props.index}`}>上架</a>
        <EnhanceModal
          title={<><Icon type="info-circle" theme="outlined"
                         style={{color: 'rgb(255, 229, 143)', paddingRight: 10}}/>确认上架</>}
          visible={this.state.putAwayShow}
          onOk={this.handleOk}
          confirmLoading={this.props.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>确定重新上架吗？</p>
        </EnhanceModal>
      </>
    )
  }
}

Putaway.propTypes = {
  index: PropTypes.number,
  record: PropTypes.object,
}
const mapStateToProps = ({farm, loading}) => ({farm, loading})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      onPutaway(record) {
        dispatch({
          type: 'farm/putaway', payload: {record}
        })
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Putaway)
