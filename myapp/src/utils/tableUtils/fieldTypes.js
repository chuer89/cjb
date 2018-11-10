import moment from 'moment';

/*
 * column类型定义
 */
const fieldTypes = {
  normal: value => value,
  text: value => value,
  textarea: value => value,
  number: value => value,
  whippletree:value=>value||'-',
  boolean: value => {
    return value === 'true' || value === true ? '是' : '否';
  },
  date: value => {
    return value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD') : '';
  },
  datetime: value => {
    return value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss') : '';
  },
  time: value => {
    return value ? moment(new Date(parseInt(value, 10))).format('HH:mm:ss') : '';
  },
  month: value => {
    return value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM') : '';
  },
  dateRange: value => {
    const start = value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD') : '';
    const end = value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD') : '';
    return `${start} - ${end}`;
  },
  datetimeRange: value => {
    const start = value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss') : '';
    const end = value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss') : '';
    return `${start} - ${end}`;
  },
  enum: (value, { enums }) => {
    let enumValue = '';
    if (value && !Array.isArray(enums)) {
      enumValue = value;
    } else if (Array.isArray(enums)) {
      const enumsFilter = enums.find(x => x.value == value) || {};
      enumValue = enumsFilter.label || value;
    }
    return enumValue;
  },
  enumGroup: (value, { options }) => {
    let enumGroup = [];
    if (!Array.isArray(value)) {
      enumGroup = [value];
    } else if (Array.isArray(options)) {
      enumGroup = value.map(v => (options.find(x => x.value == v) || {}).label);
    } else {
      enumGroup = value.map(v => options[v]);
    }
    return enumGroup.filter(v => v !== undefined && v !== '').join(',');
  },
  cascader: (value, { options }) => {
    let cascader = [];
    if (!Array.isArray(value)) {
      cascader = [value];
    } else if (!options) {
      cascader = value;
    } else {
      cascader = [];
      let opts = options;
      for (let index = 0; index < value.length; index++) {
        const opt = opts.find(x => x.value === value[index]);
        if (!opt) {
          cascader = [];
          break;
        }
        cascader.push(opt.label);
        opts = opt.children;
      }
    }
    return cascader.filter(v => v !== undefined && v !== '').join('/');
  }
};

/*
 * 扩展column类型定义
 */
export const combineTypes = types => {
  Object.assign(fieldTypes, types);
};

export default fieldTypes;
