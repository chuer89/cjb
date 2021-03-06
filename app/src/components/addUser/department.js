import React from 'react';
import { connect } from 'dva';
import { Form, Button, Radio } from 'antd';
import _ from 'lodash';
import style from './add.less';

const FormItem = Form.Item;

// 所属部门
class DepartmentForm extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { form, handerNext } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        handerNext(values);
      }
    });
  }

  onSave = (e) => {
    e.preventDefault();
    let { form, handerSave } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        handerSave(values);
      }
    });
  }

  render() {
    let { form, handerChange, userOrganizations, storeStructure, departmentType, userDetails } = this.props;
    const { getFieldDecorator } = form;

    // orgId 组织，storeId 门店
    let { orgId, storeId } = userDetails || {};

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    let renderStuc = '';
    let renderRadio = '';
    let brandData = [];
    let renderBrand = '';
    if (departmentType === '2' && !_.isEmpty(userOrganizations)) {
      renderRadio = userOrganizations.map((item) => {
        return (
          <Radio value={item.id} key={item.id}>{item.name}</Radio>
        )
      });
      renderStuc = (
        <FormItem {...formItemLayout} label="行政组织">
          {getFieldDecorator('orgId', {
            initialValue: orgId,
            rules: [{
              required: true, message: '请选择行政组织',
            }],
          })(
            <Radio.Group>{renderRadio}</Radio.Group>
          )}
        </FormItem>
      );
    } else if (!_.isEmpty(storeStructure)) {
      brandData = storeStructure[0].brand;

      _.forEach(brandData, (item) => {
        item.hasStore = false;

        if (!_.isEmpty(item.area)) {
          _.forEach(item.area, (itemArea) => {
            itemArea.hasStore = false;
            if (!_.isEmpty(itemArea.store)) {
              item.hasStore = true;
              itemArea.hasStore = true;
            }
          });
        }
      });

      // console.log(brandData)

      renderBrand = brandData.map((item) => {
        let { area } = item;
        let renderArea = '';
        if (!_.isEmpty(area)) {
          renderArea = area.map((itemArea) => {
            let { store } = itemArea;
            let renderStore = '';
            if (!_.isEmpty(store)) {
              renderStore = store.map((itemStore) => {
                return (
                  <div key={itemStore.sid} className={style.departmentItem + ' ' + style.storeBox}>
                    <Radio value={itemStore.sid}>{itemStore.sname}</Radio>
                  </div>
                )
              });
            }
            // 区域
            return (
              <div key={itemArea.aid} className={style.areaBox} style={{ 'display': itemArea.hasStore ? 'block' : 'none' }}>
                <div className={style.title}><i className="iconfont">&#xe657;</i>{itemArea.aname}</div>
                <div className={style.seleDepartment}>{renderStore}</div>
              </div>
            )
          });
        }
        // 品牌
        return (
          <div key={item.bid} className={style.brandBox} style={{ 'display': item.hasStore ? 'block' : 'none' }}>
            <div className={style.title}><i className="iconfont">&#xe612;</i>{item.bname}</div>
            <div>{renderArea}</div>
          </div>
        )
      });

      renderStuc = (
        <FormItem {...formItemLayout} label="门店组织">
          {getFieldDecorator('storeId', {
            initialValue: storeId,
            rules: [{
              required: true, message: '请选择门店组织',
            }],
          })(
            <div>
              <Radio.Group defaultValue={storeId}>{renderBrand}</Radio.Group>
            </div>
          )}
        </FormItem>
      )
    }

    let renderSave = (
      <Button type="primary" htmlType="submit" size="large" className={style.nextBtn}>下一步</Button>
    );
    if (!_.isEmpty(userDetails)) {
      renderSave = (
        <div>
          <Button type="primary" onClick={this.onSave} size="large" className={style.saveBtn}>保存</Button>
          <Button htmlType="submit">下一步</Button>
        </div>
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="员工归属">
          {getFieldDecorator('guishu', {
            initialValue: departmentType,
            rules: [{
              required: true, message: '请选择员工归属',
            }],
          })(
            <Radio.Group onChange={handerChange}>
              <Radio value="1">门店</Radio>
              <Radio value="2">企业直管</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {renderStuc}
        <FormItem>
          <div className={style.submitBtnBox}>
            {renderSave}
          </div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDepartmentForm = Form.create()(DepartmentForm);

const Department = ({ handerNext, structure, handerChange, departmentType, userDetails, handerSave }) => {
  const { sectionStructure, storeStructure } = structure

  let opt = {
    handerNext,
    userOrganizations: sectionStructure,
    departmentType,
    storeStructure,
    userDetails,
    handerSave,
    handerChange(e) {
      let departmentType = e.target.value;
      _.isFunction(handerChange) && handerChange(departmentType);
    }
  };

  return (
    <div>
      <WrappedDepartmentForm {...opt} />
    </div>
  );
};

export default connect((({ structure }) => ({
  structure,
})))(Department);
