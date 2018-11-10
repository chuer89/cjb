// import react from 'react';
import { Form, Input, Button } from 'antd';
import styles from './MyFilter.less';
import InputGroup from './InputGroup';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormItem = Form.Item;



const MyFilter = ({
  onSeach,
  onSeachSelf,
  form: {
  getFieldDecorator,
  validateFields,
}}) => {


  const onOK = () => {
    validateFields((err, values) => {
      if(err) {
        return;
      }
      const {price, area, queryStr} = values;
      onSeach({
        priceMax: price.max,
        priceMin: price.min,
        areaMax: area.max,
        areaMin: area.min,
        queryStr,
      });
    });
  };

  // const areaValidator = (callback) =>{
  //
  // };

  return (
    <div className={styles.MyFilter}>
        <FormItem {...formItemLayout} label="农场面积">
          {getFieldDecorator('area', {
            initialValue: {
              max: '',
              min: '',
            },
            rules: [
              {
                validator: (rule, value, callback) => {
                  if(!value) {
                      callback();
                      return;
                  }
                  const {max, min} = value;

                  if(max && min && max < min) {
                    callback('最大面积不能小于最小面积');
                    return;
                  }
                  if(max >= 100000000) {
                    callback('最大面积不能大于100000000');
                    return;
                  }
                  callback();
                },
              },
            ],
          })(
            <InputGroup  unit="平方米"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="农场价格">
          {getFieldDecorator('price', {
            initialValue: {
              max: '',
              min: '',
            },
            rules: [
              {
                validator: (rule, value, callback) => {

                  if(!value) {
                      callback();
                      return;
                  }
                  const {max, min} = value;

                  if(max && min && max < min) {
                    callback('最大价格不能小于最小价格');
                    return;
                  }
                  if(max >= 500000000) {
                    callback('最大价格不能大于500000000');
                    return;
                  }
                  callback();
                },
              },
            ],
          })(
            <InputGroup unit="元"/>
          )}
        </FormItem>
        {getFieldDecorator('queryStr', {initialValue: ''})(
          <Input
          style={{width: '240px', margin: '0 24px'}}
          maxLength="100"
          className={styles.input} placeholder="请输入农场名称/类型/地址" />
        )}
        <Button type="primary" style={{marginRight: '24px'}} onClick={onOK}>搜索</Button>
        <Button type="primary" ghost onClick={onSeachSelf}>已认领农场</Button>
    </div>
  );
};

export default Form.create()(MyFilter);
