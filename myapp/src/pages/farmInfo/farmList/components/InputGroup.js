import React, {Component} from 'react';
import {Input} from 'antd';
import styles from './inputGroup.less';
class InputGroup extends Component {
  constructor (props) {
    super(props);

    const value = props.value || {};
    this.state = {
      max: value.max || '',
      min: value.min || '',
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
     // Should be a controlled component.
     if ('value' in nextProps) {
       const value = nextProps.value;
       this.setState(value);
     }
   }

   triggerChange = (changedValue) => {
      // Should provide an event to pass value to Form.
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(Object.assign({}, this.state, changedValue));
      }
    }

  handleminChange = (e) => {

    let number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if(!number) {
      number = '';
    }
    if (!('value' in this.props)) {
      this.setState({ min: number });
    }
    this.triggerChange({ min:number });
  }

  handlemaxChange = (e) => {
    let number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if(!number) {
      number = '';
    }
    if (!('value' in this.props)) {
      this.setState({ max: number });
    }
    this.triggerChange({ max: number });
  }

  render () {
   const {max, min} = this.state;
  const unit = this.props.unit || '';
   return (
     <div className={styles.inputGroup}>
        <Input
          placeholder={unit}
          type="text"
          value={min}
          onChange={this.handleminChange}
        />
        <span className={styles.split}>-</span>
        <Input
          type="text"
          placeholder={unit}
          value={max}
          onChange={this.handlemaxChange}
        />
     </div>
   );
   }

}

export default InputGroup;
