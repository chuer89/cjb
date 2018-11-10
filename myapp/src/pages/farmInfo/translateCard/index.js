import React, {Component} from 'react';
import {Form, Input, Select, Radio, Row, Col, Checkbox} from 'antd';
import PropTypes from 'prop-types';
import AddressSelect from './address';
// import {CountryAddress} from 'components'
import Quill from './Quill';

import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Option} = Select;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const containerColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 18},
  },
};

const priceMap = {
  EUR: '欧元',
  AUD: '澳元',
  USD: '美元',
  CNY: '人民币',
};

const areaMap = {
  ACRE: '英亩',
  MU: '亩',
};

class Index extends Component {
  constructor(props) {
    super(props);
    const {
      farmName,
      farmNameEn,
      type = 1,
      totalPrice,
      unitPrice,
      area,
      address,
      addressEn,
      lng,
      lat,
      content, // 农场介绍
      contentEn,
      landRights, // 土地性质
      soilPh, // 是否住宅用地
      soilType, // 土壤性质
      waterRights, // 水权介绍
      waterRightsEn,
      regulations, // 土地使用介绍
      regulationsEn,
      disadvantage, // 杂草害虫
      disadvantageEn,
      rainfall, // 降雨量
      unitCode, // 价格单位
      areaCode, // 面积单位
      nationId, // 国家
      provinceId,// 省/洲
      cityId, // 城市
      cityNameEn,
      cityName,
      provinceName,
      provinceNameEn,
      nationNameEn,
      nationName,
    } = props.translateData;
    this.state = {
      farmName,
      farmNameEn,
      type,
      totalPrice,
      unitPrice,
      area,
      address,
      addressEn,
      lng,
      lat,
      content, // 农场介绍
      contentEn,
      landRights, // 土地性质
      soilPh, // 是否住宅用地
      soilType, // 土壤性质
      waterRights, // 水权介绍
      waterRightsEn,
      regulations, // 土地使用介绍
      regulationsEn,
      disadvantage, // 杂草害虫
      disadvantageEn,
      unitCode: unitCode.toLocaleUpperCase(), // 价格单位
      areaCode: areaCode.toLocaleUpperCase(),// 面积单位
      nationId, // 国家
      provinceId,// 省/洲
      cityId, // 城市
      rainfall,
      zhQuillShow: false,
      enQuillShow: false,
      cityNameEn,
      cityName,
      provinceName,
      provinceNameEn,
      nationNameEn,
      nationName,
    };
  }

  render() {
    const {getFieldDecorator = null, getFieldValue, setFieldsValue} = this.props.form;
    const {enDisabled, zhDisabled, baseDataIsRequired, soilTypeEn, soilTypeZh} = this.props;
    let {
      farmName,
      farmNameEn,
      type,
      totalPrice,
      unitPrice,
      area,
      address,
      addressEn,
      lng,
      lat,
      content, // 农场介绍
      contentEn,
      landRights, // 土地性质
      soilPh, // 是否住宅用地
      soilType, // 土壤性质
      waterRights, // 水权介绍
      waterRightsEn,
      regulations, // 土地使用介绍
      regulationsEn,
      disadvantage, // 杂草害虫
      disadvantageEn,
      unitCode, // 价格单位
      areaCode, // 面积单位
      rainfall,
      nationId,
      provinceId,
      cityId,
      zhQuillShow,
      enQuillShow,
      cityNameEn,
      cityName,
      provinceName,
      provinceNameEn,
      nationNameEn,
      nationName,
    } = this.state;

    if (!content) {
      content = contentEn;
    }
    if (!contentEn) {
      contentEn = content;
    }

    const setUnitPrice = () => {
      setTimeout(() => {
        const totalPrice = getFieldValue('totalFarmPrice');
        const area = getFieldValue('framArea');
        if (totalPrice && area) {
          // 保留两位数
          const value = `${totalPrice / area}`.match(/^\d+(\.\d{1,2})?/);

          this.setState({unitPrice: value[0]});
          setFieldsValue({framPrice: value[0]});
        } else {
          this.setState({unitPrice: ''});
          setFieldsValue({framPrice: ''});
        }
      }, 0);
    };

    if (totalPrice && area) {
      const value = `${totalPrice / area}`.match(/^\d+(\.\d{1,2})?/);
      unitPrice = value[0];
    }

    const enData = {
      baseData: {
        title: 'Basic farm information',
        _data: [
          {
            label: 'Farm name',
            name: 'farmName',
            value: farmNameEn,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场名称',
              },
              {
                max: 200,
                message: '农场名称不得超过200字符',
              },
            ],
          },
          {
            label: 'Farm type',
            name: 'farmType',
            value: type,
            type: 'inputSelect',
            enLikeZh: baseDataIsRequired,
            options: [
              {
                key: 1,
                label: 'Leisure',
              }, {
                key: 2,
                label: 'Livestock/Culture',
              }, {
                key: 6,
                label: 'Olanting',
              }, {
                key: 3,
                label: 'Winery/Vineyard',
              }, {
                key: 4,
                label: 'Forest/Hunting',
              }, {
                key: 5,
                label: 'Comprehensive',
              },
            ],
            rules: [
              {
                required: baseDataIsRequired,
                message: '请选择农场类型',
              },
            ],
          },
          {
            label: 'Total farm price',
            name: 'totalFarmPrice',
            value: totalPrice,
            inputType: 'number',
            disabled: !!totalPrice,
            type: 'input',
            onInput: setUnitPrice,
            enLikeZh: true,
            addonName: 'en-unitCode',
            addonAfter: ['EUR', 'AUD', 'USD', 'CNY'],
            addAfterOnChange: (value) => {
              this.setState({
                unitCode: value,
              });
              setFieldsValue({'zh-unitCode': value});
            },
            addonAfterInitValue: unitCode,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场总价格',
              },
              {
                pattern: /^\d+(\.\d{1,2})?$/,
                message: '请保留小数点后两位',
              },
              {
                validator: (rule, value, callback) => {
                  if (value < 0 || value === 0) {
                    callback('必须大于0');
                    return;
                  }

                  if (value >= 500000000) {
                    callback('不能大于500000000');
                    return;
                  }

                  callback();
                },
              },
            ],
          },
          {
            label: 'Fram area',
            name: 'framArea',
            value: area,
            type: 'input',
            inputType: 'number',
            disabled: !!area,
            onInput: setUnitPrice,
            enLikeZh: true,
            addonName: 'en-areaCode',
            addonAfter: ['ACRE', 'MU'],
            addonAfterInitValue: areaCode,
            addAfterOnChange: (value) => {
              this.setState({
                areaCode: value,
              });
              setFieldsValue({'zh-areaCode': value});
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场面积',
              },
              {
                validator: (rule, value, callback) => {
                  if (value < 0 || value === 0) {
                    callback('必须大于0');
                    return;
                  }

                  if (value >= 100000000) {
                    callback('不能大于100000000');
                    return;
                  }

                  callback();
                },
              },
            ],
          },
          {
            label: 'Fram price',
            name: 'framPrice',
            value: unitPrice,
            type: 'input',
            disabled: true,
            enLikeZh: true,
            addonAfter: `${unitCode}/${areaCode}`,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场单价',
              },
            ],
          },
          {
            label: 'Fram address',
            name: 'framAddress',
            value: addressEn,
            type: 'addressSelect',
            rules: [
              {
                required: true,
                message: '请选择农场地址',
              },
              {
                validator: (rule, value, callback) => {
                  let {city, address} = value;
                  city = city ? city.filter(_ => _): city;
                  if (!city || city.length <= 0) {
                    callback('请选择农场城市地址');
                    return;
                  }
                  if(!address) {
                    callback('请输入农场详细地址');
                    return;
                  }
                  if(address.length > 500) {
                    callback('不能超过500字符');
                    return;
                  }
                  callback();
                },
              },
            ],
          },
          {
            label: 'longitude',
            name: 'lng',
            value: lng,
            inputType: 'number',
            type: 'input',
            enLikeZh: true,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入经度',
              },
            ],

          },
          {
            label: 'latitude',
            name: 'lat',
            value: lat,
            inputType: 'number',
            type: 'input',
            enLikeZh: true,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入纬度',
              },
            ],
          },
          {
            label: 'Fram introduction',
            name: 'framIntroduction',
            value: contentEn,
            type: 'quill',
            quillShow: enQuillShow,
            onClick: () => {
              this.setState({enQuillShow: true});
            },
            onCancel: () => {
              this.setState({
                enQuillShow: false,
              });
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农介绍',
              },
            ],
          },

        ],
      },
      otherData: {
        title: 'Farm support information',
        _data: [
          {
            label: 'Land nature',
            name: 'landNatrue',
            value: landRights,
            options: [
              {
                key: 1,
                label: 'Permanent right',
              },
              {
                key: 2,
                label: 'Leasehold',
              },
            ],
            type: 'radio',
            enLikeZh: true,
          },
          {
            label: 'Soil pH',
            name: 'soilPh',
            value: soilPh,
            type: 'radio',
            enLikeZh: true,
            options: [
              {
                key: 1,
                label: '4.5-5.5Strong acidity',
              },
              {
                key: 2,
                label: '5.5-6.5Acidic',
              },
              {
                key: 3,
                label: '6.5-7.5neutral',
              },
              {
                key: 4,
                label: '>9.5very alkaline',
              },
              {
                key: 5,
                label: '8.5-9.5Strong alkaline',
              },
              {
                key: 6,
                label: '7.5-8.5Alkaline',
              },
            ],
          },
          {
            label: 'Soil type',
            name: 'soilType',
            value: () => {
              return soilTypeEn.map(item => {
                if (soilType && soilType.split(',').includes(item.key)) {
                  return item.label;
                } else {
                  return '';
                }
              }).filter(item => item);
            },
            type: 'checkbox',
            enLikeZh: true,
            onChange: (value) => {
              const soilType = soilTypeEn.map(item => {
                if (value.includes(item.label)) {
                  return item.key;
                } else {
                  return '';
                }
              }).filter(item => item);
              this.setState({soilType: soilType.join(',')});
              setFieldsValue({soilType: soilType.join(',')});
            },
            options: soilTypeEn,
          },
          {
            label: 'Water rights introduction',
            name: 'waterIntroduction',
            value: waterRightsEn,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                max: 1000,
                message: '不能超过1000字符',
              },
            ],
          },
          {
            label: 'Introduction to land use regulations',
            name: 'landUseIntroduction',
            value: regulationsEn,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                max: 3000,
                message: '不能超过3000字符',
              },
            ],
          },
          {
            label: 'Weeds and pests',
            name: 'weedsAndPests',
            value: disadvantageEn,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                max: 1000,
                message: '不能超过1000字符',
              },
            ],
          },
          {
            label: 'Rainfall',
            name: 'rainfall',
            value: rainfall,
            type: 'input',
            inputType: 'number',
            enLikeZh: true,
          },
        ],
      },
    };

    const zhData = {
      baseData: {
        title: '农场基本信息',
        _data: [
          {
            label: '农场名称',
            name: 'farmName',
            value: farmName,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场名称',
              },
              {
                max: 100,
                message: '农场名称不得超过100字符',
              },
            ],
          },
          {
            label: '农场类型',
            name: 'farmType',
            value: type,
            type: 'inputSelect',
            enLikeZh: true,
            options: [
              {
                key: 1,
                label: '休闲',
              }, {
                key: 2,
                label: '畜牧/养殖',
              }, {
                key: 6,
                label: '种植',
              }, {
                key: 3,
                label: '酒庄/葡萄园',
              }, {
                key: 4,
                label: '林木/狩猎',
              }, {
                key: 5,
                label: '综合',
              },
            ],
            rules: [
              {
                required: baseDataIsRequired,
                message: '请选择农场类型',
              },
            ],
          },
          {
            label: '农场总价格',
            name: 'totalFarmPrice',
            enLikeZh: true,
            value: totalPrice,
            inputType: 'number',
            type: 'input',
            disabled: !!totalPrice,
            onInput: setUnitPrice,
            addonName: 'zh-unitCode',
            addonAfter: ['欧元', '澳元', '美元', '人民币'],
            addonAfterInitValue: priceMap[unitCode],
            addAfterOnChange: (value) => {

              for (let p in priceMap) {
                if (priceMap[p] === value) {
                  this.setState({
                    unitCode: p,
                  });
                  setFieldsValue({'en-unitCode': p});
                }
              }
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场总价',
              },
              {
                pattern: /^\d+(\.\d{1,2})?$/,
                message: '请保留小数点后两位',
              },
              {
                validator: (rule, value, callback) => {
                  if (value < 0 || value === 0) {
                    callback('必须大于0');
                    return;
                  }

                  if (value >= 500000000) {
                    callback('不能大于500000000');
                    return;
                  }

                  callback();
                },
              },
            ],
          },
          {
            label: '农场面积',
            name: 'framArea',
            enLikeZh: true,
            value: area,
            onInput: setUnitPrice,
            inputType: 'number',
            disabled: !!area,
            type: 'input',
            addonName: 'zh-areaCode',
            addonAfter: ['英亩', '亩'],
            addonAfterInitValue: areaMap[areaCode],
            addAfterOnChange: (value) => {
              for (let p in areaMap) {
                if (areaMap[p] === value) {
                  this.setState({
                    areaCode: p,
                  });
                  setFieldsValue({'en-areaCode': p});
                }
              }
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场面积',
              },
              {
                validator: (rule, value, callback) => {
                  if (value < 0 || value === 0) {
                    callback('必须大于0');
                    return;
                  }

                  if (value >= 100000000) {
                    callback('农场面积不能大于100000000');
                    return;
                  }

                  callback();
                },
              },
            ],
          },
          {
            label: '农场单价',
            name: 'framPrice',
            value: unitPrice,
            type: 'input',
            enLikeZh: true,
            disabled: true,
            addonAfter: `${priceMap[unitCode]}/${areaMap[areaCode]}`,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场单价',
              },
            ],
          },
          {
            label: '农场地址',
            name: 'framAddress',
            value: address,
            type: 'addressSelect',
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入农场地址',
              },
              {
                validator: (rule, value, callback) => {
                  let {city, address} = value;
                  city = city ? city.filter(_ => _) : city;
                  if (!city || city.length <= 0) {
                    callback('请选择农场城市地址');
                    return;
                  }
                  if (!address) {
                    callback('请输入农场详细地址');
                    return;
                  }
                  if (address.length > 150) {
                    callback('不能超过150字符');
                    return;
                  }
                  callback();
                },
              },

            ],
          },
          {
            label: '经度',
            name: 'lng',
            value: lng,
            inputType: 'number',
            type: 'input',
            enLikeZh: true,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入经度',
              },
            ],
          },
          {
            label: '纬度',
            name: 'lat',
            value: lat,
            inputType: 'number',
            type: 'input',
            enLikeZh: true,
            rules: [
              {
                required: baseDataIsRequired,
                message: '请输入纬度',
              },
            ],
          },
          {
            label: '农场介绍',
            name: 'framIntroduction',
            value: content,
            type: 'quill',
            quillShow: zhQuillShow,
            onClick: () => {
              this.setState({
                zhQuillShow: true,
              });
            },
            onCancel: () => {
              this.setState({
                zhQuillShow: false,
              });
            },
            rules: [
              {
                required: baseDataIsRequired,
                message: '农场介绍不能为空',
              },
            ],
          },

        ],
      },
      otherData: {
        title: '农场配套信息',
        _data: [
          {
            label: '土地性质',
            name: 'landNatrue',
            value: landRights,
            options: [
              {
                key: 1,
                label: '永久权',
              },
              {
                key: 2,
                label: '租赁权',
              },
            ],
            type: 'radio',
            enLikeZh: true,
          },
          {
            label: '土壤酸碱度',
            name: 'soilPh',
            value: soilPh,
            type: 'radio',
            enLikeZh: true,
            options: [
              {
                key: 1,
                label: '4.5-5.5强酸性',
              },
              {
                key: 2,
                label: '5.5-6.5酸性',
              },
              {
                key: 3,
                label: '6.5-7.5中性',
              },
              {
                key: 4,
                label: '>9.5极强碱性',
              },
              {
                key: 5,
                label: '8.5-9.5强碱性',
              },
              {
                key: 6,
                label: '7.5-8.5碱性',
              },
            ],
          },
          {
            label: '土壤类型',
            name: 'soilType',
            value: () => {
              return soilTypeZh.map(item => {
                if (soilType && soilType.split(',').includes(item.key)) {
                  return item.label;
                } else {
                  return '';
                }
              }).filter(item => item);
            },
            type: 'checkbox',
            enLikeZh: true,
            onChange: (value) => {
              const soilType = soilTypeZh.map(item => {
                if (value.includes(item.label)) {
                  return item.key;
                } else {
                  return '';
                }
              }).filter(item => item);
              this.setState({soilType: soilType.join(',')});
              setFieldsValue({soilType: soilType.join(',')});
            },
            options: soilTypeZh,
          },
          {
            label: '可用水资源',
            value: waterRights,
            type: 'textArea',
            name: 'waterIntroduction',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                max: 1000,
                message: '不能超过1000字符',
              },
            ],
          },
          {
            label: '土地使用规定介绍',
            name: 'landUseIntroduction',
            value: regulations,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                max: 3000,
                message: '不能超过3000字符',
              },
            ],
          },
          {
            label: '杂草和害虫',
            name: 'weedsAndPests',
            value: disadvantage,
            type: 'textArea',
            autosize: {
              minRows: 2,
              maxRows: 2,
            },
            rules: [
              {
                max: 1000,
                message: '不能超过1000字符',
              },
            ],
          },
          {
            label: '降雨量',
            name: 'rainfall',
            value: rainfall,
            type: 'input',
            inputType: 'number',
            enLikeZh: true,
          },
        ],
      },
    };

    const renderList = (data, lang = "en") => {
      const {title, _data} = data;
      return (
        <div className={styles.cardContainer}>
          <header className={styles.cardTitle}>{title}</header>
          <div>
            {_data && _data.length ?
              _data.map((item) => {
                let reactDom = null;
                let {options} = item;
                const fieldNames = item.enLikeZh ? item.name : `${lang}-${item.name}`;
                switch (item.type) {
                  case 'input':
                    let addonAfter = null;
                    let disabled = ((enDisabled || zhDisabled) && item.enLikeZh) || item.disabled;
                    // 如果有addonAfter
                    if (item.addonAfter) {
                      let addonDisabled = disabled || !!item.addonAfterInitValue;
                      // 如果是数组
                      if (Array.isArray(item.addonAfter)) {
                        addonAfter = getFieldDecorator(item.addonName, {
                          initialValue: item.addonAfterInitValue,
                        })(
                          <Select style={{width: 90}}
                                  disabled={addonDisabled}
                                  onChange={(value) => {
                                    item.addAfterOnChange && item.addAfterOnChange(value);
                                  }}
                          >
                            {item.addonAfter.map((value) => (<Option key={value} value={value}>{value}</Option>))}
                          </Select>
                        );
                      } else {
                        addonAfter = item.addonAfter;
                      }
                    }
                    reactDom = (
                      <FormItem
                        {...formItemLayout}
                        key={item.label}
                        label={item.label}>
                        {getFieldDecorator(fieldNames, {
                          initialValue: item.value,
                          rules: item.rules || [],
                        })(
                          <Input
                            onInput={() => {
                              item.onInput && item.onInput();
                            }}
                            type={item.inputType ? item.inputType : 'string'}
                            disabled={disabled}
                            addonAfter={addonAfter}/>
                        )}
                      </FormItem>
                    );
                    break;
                  case 'inputSelect':
                    reactDom = (
                      <FormItem
                        {...formItemLayout} key={item.label}
                        label={item.label}>
                        {getFieldDecorator(fieldNames, {
                          initialValue: item.value,
                          rules: item.rules || [],
                        })(
                          <Select
                            onChange={(value) => {
                              item.onChange && item.onChange(value);
                            }}
                            style={{width: "100%"}}>
                            {options && options.length ?
                              options.map(({key, label}) => (<Option key={key} value={key}>{label}</Option>))
                              : null}
                          </Select>
                        )}

                      </FormItem>);

                    break;
                  case 'textArea':
                    reactDom = (
                      <FormItem
                        {...formItemLayout}
                        key={item.label}
                        label={item.label}>
                        {getFieldDecorator(fieldNames, {
                          initialValue: item.value,
                          rules: item.rules || [],
                        })(
                          <TextArea autosize={item.autosize} style={{resize: 'none'}}/>
                        )}
                      </FormItem>
                    );
                    break;
                  case 'radio':
                    reactDom = (
                      <FormItem
                        {...formItemLayout}
                        key={item.label}
                        label={item.label}>
                        {getFieldDecorator(fieldNames, {
                          initialValue: item.value,
                        })(
                          <RadioGroup style={{width: "100%"}}>
                            {options && options.length ?
                              options.map(({key, label}) => (<Radio key={key} value={key}>{label}</Radio>))
                              : null}
                          </RadioGroup>
                        )}

                      </FormItem>
                    );
                    break;
                  case 'addressSelect':
                    console.log(lang)
                    reactDom = (
                      <FormItem
                        {...formItemLayout}
                        key={item.label}
                        label={item.label}>
                        {getFieldDecorator(fieldNames, {
                          initialValue: { address: item.value, city: [nationId, provinceId, cityId] },
                          rules: item.rules || [],
                        })(
                          <AddressSelect  lang={lang} />
                        )}
                      </FormItem>);
                    break;
                  case 'quill':
                    reactDom = (
                      <FormItem
                        {...formItemLayout}
                        key={item.label}
                        label={item.label}>
                        {getFieldDecorator(fieldNames, {
                          initialValue: item.value,
                          rules: item.rules || [],
                        })(
                          <Quill
                            visible={item.quillShow}
                            onClick={item.onClick}
                            onCancel={item.onCancel}
                          />
                        )}
                      </FormItem>);
                    break;
                  case 'checkbox':
                    getFieldDecorator(fieldNames, {
                      initialValue: item.value,
                      rules: item.rules || [],
                    });
                    reactDom = (
                      <FormItem
                        {...formItemLayout}
                        key={item.label}
                        label={item.label}>

                        <CheckboxGroup
                          value={item.value()}
                          onChange={(value) => {
                            item.onChange && item.onChange(value);
                          }}
                          options={item.options.map(_ => _.label)}/>
                      </FormItem>);
                    break;
                  default:
                    break;
                }
                return reactDom;
              })
              : null}
          </div>
        </div>
      );
    };

    const renderDisabled = (data, lang) => {
      const {title, _data} = data;
      return (
        <div className={styles.cardContainer}>
          <header className={styles.cardTitle}>{title}</header>
          {_data && _data.length ?
            _data.map((item) => {
              let reactDom = null;
              switch (item.type) {
                case 'inputSelect':
                case 'radio':
                  reactDom = item.value ? item.options.filter((_) => (_.key === parseInt(item.value, 10)))[0].label : '';
                  break;
                case 'quill':
                  let remarkData = [];
                  if (item.value) {
                    try {
                      remarkData = JSON.parse(item.value);
                    } catch (e) {
                      // Message.error(e);
                    }
                  }

                  reactDom = (
                    <div style={{width: '100%', height: '208px', overflow: 'auto'}}>
                      {Array.isArray(remarkData) && remarkData.map(({type, value}, index) => {
                        let dom = '';
                        if (parseInt(type, 10) === 1) {
                          dom = <div key={index}><img style={{width: '100%'}} src={value} alt="img"/></div>;
                        } else if (parseInt(type, 10) === 2) {
                          dom = <p key={index}>{value}</p>;
                        }

                        return dom;
                      })}

                    </div>
                  );
                  break;
                case 'checkbox':
                  reactDom = item.value().join(',');
                  break;
                case 'addressSelect':
                  let nation = lang === 'en' ? nationNameEn : nationName;
                  let city = lang === 'en' ? cityNameEn : cityName;
                  let province = lang === 'en' ? provinceNameEn : provinceName;
                  reactDom = (
                    <div>
                      {nation && province && city && <p>{`${nation} ${province} ${city}`}</p>}
                      <p>{item.value}</p>
                    </div>
                  );
                  break;
                default:
                  reactDom = `${item.value || ''} ${item.addonAfterInitValue || item.addonAfter || ''}`;

              }
              return <FormItem
                {...formItemLayout}
                key={item.label}
                label={item.label}>
                {reactDom}
              </FormItem>;
            })
            : null
          }
        </div>
      );

    };

    return (
      <Row
        type="flex"
        gutter={26}
        className={styles.InputCard + ' ' + this.props.className}>
        <Col {...containerColProps} >
          <div className={styles.enContainer}>
            {enDisabled ? renderDisabled(enData.baseData, 'en') : renderList(enData.baseData, 'en')}
            {enDisabled ? renderDisabled(enData.otherData, 'en') : renderList(enData.otherData, 'en')}

          </div>
        </Col>
        <Col {...containerColProps} >
          <div className={styles.zhContainer}>
            {zhDisabled ? renderDisabled(zhData.baseData, 'zh') : renderList(zhData.baseData, 'zh')}
            {zhDisabled ? renderDisabled(zhData.otherData, 'zh') : renderList(zhData.otherData, 'zh')}
          </div>
        </Col>
      </Row>
    );
  };
}

Index.defaultProps = {
  enDisabled: false, // 英文只度？
  zhDisabled: false, // 中文制度
  baseDataIsRequired: true, // baseData是否必须
  form: {},
  className: '',
  soilTypeEn: [],
  soilTypeZh: [],
};

Index.propTypes = {
  translateData: PropTypes.object.isRequired, // 数据
  form: PropTypes.object, // 表单
  enDisabled: PropTypes.bool, // 英文只度？
  zhDisabled: PropTypes.bool, // 中文制度
  baseDataIsRequired: PropTypes.bool,
  className: PropTypes.string,
  soilTypeZh: PropTypes.array.isRequired,
  soilTypeEn: PropTypes.array.isRequired,
};

export default Index;
