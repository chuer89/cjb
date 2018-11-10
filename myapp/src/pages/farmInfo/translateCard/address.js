import React, { Component} from 'react';
import {Input, Cascader} from 'antd';
import {connect} from 'dva';

import _ from 'lodash';

class Address extends Component {
  constructor (props) {
    super(props);
    const value = props.value || {};
    this.state = {
      city: value.city || '',
      address: value.address || '',
      lang: this.props.lang || '',
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
   // Should be a controlled component.
   if ('value' in nextProps) {
     const value = nextProps.value;
     this.setState(value);
   }
 }

  componentDidMount () {
    console.log('did')
    this.props.dispatch({
      type: 'address/getNation',
      payload: {
        lang: this.state.lang,
      },
      callback: () => {
        const provinceId = this.state.city[1];
        const nationId = this.state.city[0];
        if(nationId) {
          this.getProvince(nationId, () => {
            if(provinceId) {
              this.getCity(provinceId, () => {
                this.setState({city: this.state.city});
              });
            }
          });
        }
      },
    });
  }

  handleCascaderChange = (e) => {
    const city = e;
    this.setState({ city });
    this.triggerChange({city});
  }

  handleInputChange = (value) => {
   const address = value.target.value || '';
   if (!('value' in this.props)) {
     this.setState({ address });
   }
   this.triggerChange({ address });
  }

  triggerChange = (changeValue) => {
    const onChange = this.props.onChange;
    if(onChange) {
      onChange(Object.assign({}, this.state, changeValue));
   }
    }

  getProvince = (id, callback) => {
    this.props.dispatch({
      type: 'address/getProvince',
      payload: {
        id: id,
        lang: this.state.lang,
      },
      callback,
    });
  }

  getCity = (id, callback) => {
    this.props.dispatch({
      type: 'address/getCity',
      payload: {
        id: id,
        lang: this.state.lang,
      },
      callback,
    });
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if(targetOption.label === 'nation') {
      this.getProvince(targetOption.id, () => {
        targetOption.loading = false;
      });
    } else if(targetOption.label === 'province'){
      this.getCity(targetOption.id,() => {
        targetOption.loading = false;
      });
    }

  }

  render () {
    const {address, lang, city} = this.state;
    let data;
    if(lang === 'zh') {
      data = _.get(this.props, 'address.zhData');

    } else {
      data = _.get(this.props, 'address.enData');
    }

    return (
      <div
        id={`${lang}addressSelect`}
        style={{position: 'relative' }}>
        <Cascader
        style={{width: '100%'}}
        fieldNames={{
          label: 'name',
          value: 'id',
          children: 'children',
        }}
        options={data}
        onChange={this.handleCascaderChange}
        loadData={this.loadData}
        changeOnSelect
        value={city}
        getPopupContainer={() => document.getElementById(`${lang}addressSelect`)}
        />
        <div style={{paddingTop: '10px'}}>
          <Input  value={address} onChange={this.handleInputChange} />
        </div>
      </div>
    );
  }
}

export default connect(({ address }) => ({ address }))(Address);
