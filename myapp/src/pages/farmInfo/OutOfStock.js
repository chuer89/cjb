import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Modal, Icon, Select, Form, Row, Col} from 'antd'
import {EnhanceModal} from 'components'
import {enumType} from "./enum";

const {SHELVES_BECAUSE} = enumType;
const FormItem = Form.Item;
const Option = Select.Option;

class OutOfStock extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    outOfStockShow: false
  }
  onOutOfStockShow = () => this.setState({
    outOfStockShow: Symbol('')
  })
  handleOk = () => {
    const {
      actions,
      record,
      form: {
        validateFields
      }
    } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const {id} = record;
        const postParameters = {farmId: id, ...values}
        return actions.onOutOfStock(postParameters)
      }
    });
  }

  render() {
    const {
      index,
      confirmLoading,
      form: {
        getFieldDecorator
      }
    } = this.props
    return (<>
      <a href="javascript:;" onClick={this.onOutOfStockShow} style={{paddingLeft: 10}}
         key={`outOfStockShow_${index}`}>下架</a>
      <EnhanceModal
        title={<><Icon type="info-circle" theme="outlined"
                       style={{color: 'rgb(255, 229, 143)', paddingRight: 10}}/>确认上架</>}
        visible={this.state.outOfStockShow}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form layout="inline">
              <FormItem label="下架原因">
                {getFieldDecorator('closeType', {rules: [{required: true, message: '请选择下架原因'}]})(
                  <Select style={{width: 200}}>
                    {SHELVES_BECAUSE.map((item, index) => <Option value={item.value} key={index}>{item.title}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Form>
          </Col>
        </Row>
      </EnhanceModal>
    </>)
  };
}

const
  mapStateToProps = ({farm, loading}) => ({farm, loading});
const
  mapDispatchToProps = (dispatch) => {
    return {
      actions: {
        onOutOfStockShow: ({outOfStockShow}) => {
          dispatch({
            type: 'farm/outOfStockShow', payload: {outOfStockShow}
          })
        },
        onOutOfStock: (record) => {
          dispatch({
            type: 'farm/farmOff', payload: {record}
          })
        },
        onOutOfStockCancel: ({outOfStockShow}) => {
          dispatch({
            type: 'farm/outOfStockShow', payload: {outOfStockShow}
          })
        }
      }
    }
  }
OutOfStock
  .propTypes = {
  index: PropTypes.number,
  record: PropTypes.object,
}
export default connect(mapStateToProps, mapDispatchToProps)

(
  Form
    .create()

    (
      OutOfStock
    ))
