import React from 'react'
import App from '../../app';
import Structure from './../../../components/structure/position';

// 职位管理
class Position extends React.Component {

  render() {
    const contentStyle = {
      background: 'white',
      'padding': '24px',
    }
    return (
      <App>
        <div style={contentStyle}><Structure /></div>
      </App>
    )
  }
}

export default Position;