import {enumType} from './../enum';
import moment from 'moment';

const {FARM_TYPE, LNG_LAT_SOURCE} = enumType;
export const itemConfig = {
  queryCondition: [ // 根据用户选择塞选
    {
      inputType: 'select',
      title: 'ownerUserId',
      value: '',
      label: '农场主',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请选择农场主!',
        }]
      },
      componentsConfig: {
        defaultActiveFirstOption:false,
        showArrow:false
      },
      selectCondition: []
    },
    {
      inputType: 'input',
      title: 'farmName',
      value: '',
      label: '农场名称',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请输入农场名称!',
        }, {
          max: 50,
          message: '最多50字',
        }]
      },
      componentsConfig: {
        placeholder: '请输入农场名称'
      }
    },
    {
      inputType: 'inputNumber',
      title: 'area',
      value: '',
      label: '农场面积',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请输入农场面积!',
        }]
      },
      componentsConfig: {
        placeholder: '请输入农场面积',
        addonAfter: "亩",
        size: 'large',
        precision: 2,
        style: {width: '100%'},
        min: 0,
        max: 999999.99
      }
    },
    {
      inputType: 'select',
      title: 'type',
      value: '',
      label: '农场类型',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请选择类型!',
        }]
      },
      componentsConfig: {
        placeholder: '请选择农场类型'
      },
      selectCondition: FARM_TYPE
    },
    {
      inputType: 'inputNumber',
      title: 'totalRmb',
      value: '',
      label: '农场购买价格',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请输入农场购买价格',
        addonAfter: "人民币",
        size: 'large',
        precision: 2,
        style: {width: '100%'},
        min: 0,
        max: 9999999999.99
      }
    },
    {
      inputType: 'datePicker',
      title: 'purchaseTime',
      value: '',
      label: '农场购买时间',
      itemConfig: {
        initialValue: moment(new Date(), 'YYYY/MM/DD')
      },
      componentsConfig: {
        style: {width: '100%'},
        disabledDate: (current) => {
          return current && current < moment().subtract(1, 'days');
        },
        format: "YYYY-MM-DD",
        placeholder: '请选择农场购买时间'
      }
    },
    {
      inputType: 'countryAddress',
      title: 'site',
      value: '',
      label: '农场地址',
      ColConfig: {
        xs: 24,
        sm: 24,
        md: 24,
        xl: 12,
        xxl: 12,
        pull: 1
      },
      itemConfig: {
        initialValue: [],
        rules: [{
          required: true, message: '请选择农场地址!',
        },{
          validator: (rule, value, callback) => {
            if (value && value.length<2) {
              callback('国家和省州是必选项')
            }
            callback()
          }
        }]
      },
      componentsConfig: {
        config:{
          size: 'large',
          style: {width: '65.5%'},
          placeholder: '请选择农场地址',
        }
      }
    },
    {
      inputType: 'input',
      title: 'address',
      value: '',
      label: '农场详细地址',
      ColConfig: {
        xs: 24,
        sm: 24,
        md: 24,
        xl: 24,
        xxl: 24,
        pull: 4
      },
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请输入农场详细地址!',
        }, {
          max: 50,
          message: '最多50字',
        }]
      },
      componentsConfig: {
        style: {width: '90.3%'},
        placeholder: '请输入农场详细地址',
      }
    },
    {
      inputType: 'select',
      title: 'translateStatus',
      value: '',
      label: '农场经纬度',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请选择农场经纬度!',
        }]
      },
      componentsConfig: {
        placeholder: '谷歌/百度/高度/腾讯',
      },
      selectCondition: LNG_LAT_SOURCE
    },
    {
      inputType: 'inputNumber',
      title: 'iLng',
      value: '',
      label: '经度坐标',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请输入经度坐标!',
        }]
      },
      componentsConfig: {
        style: {width: '100%'},
        size: 'large',
        placeholder: '请输入经度坐标',
      }
    },
    {
      inputType: 'inputNumber',
      title: 'iLat',
      value: '',
      label: '纬度坐标',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请输入纬度坐标!',
        }]
      },
      componentsConfig: {
        style: {width: '100%'},
        size: 'large',
        placeholder: '请输入纬度坐标',
      }
    }]
}
