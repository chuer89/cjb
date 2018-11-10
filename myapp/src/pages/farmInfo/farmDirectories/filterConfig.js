export const filterConfig = {
  queryCondition: [
    {
      inputType: 'inputNumber',
      title: 'areaMin',
      value: '',
      label: '农场面积',
      transverse: true,
      ColConfig: {
        xs: 24,
        sm: 24,
        md: 24,
        xl: 4,
        xxl: 4,
        pull: 0
      },
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        style: {width: 100},
        placeholder: '平方米',
      }
    },
    {
      inputType: 'inputNumber',
      title: 'areaMax',
      value: '',
      label: '',
      ColConfig: {
        xs: 24,
        sm: 24,
        md: 24,
        xl: 4,
        xxl: 4,
        pull: 1
      },
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        style: {width: 100},
        placeholder: '平方米',
      }
    },
    {
      inputType: 'inputNumber',
      title: 'priceMin',
      value: '',
      label: '农场价格',
      transverse: true,
      ColConfig: {
        xs: 24,
        sm: 24,
        md: 24,
        xl: 4,
        xxl: 4,
        pull: 0
      },
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        style: {width: 100},
        placeholder: '平方米',
      }
    },
    {
      inputType: 'inputNumber',
      title: 'priceMax',
      value: '',
      label: '',
      ColConfig: {
        xs: 24,
        sm: 24,
        md: 24,
        xl: 4,
        xxl: 4,
        pull: 1
      },
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        style: {width: 100},
        placeholder: '平方米',
      }
    },
    {
      inputType: 'input',
      title: 'queryStr',
      value: '',
      label: '农场名称',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请输入农场名称/类型/地址',
      }
    }]
}
