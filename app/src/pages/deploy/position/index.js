import React from 'react'
import Structure from '@components/structure/position';

// 岗位管理
class Position extends React.Component {

  render() {
    const contentStyle = {
      background: 'white',
      'padding': '24px',
    }
    return (
      <div>
        <div style={contentStyle}><Structure /></div>
      </div>
    )
  }
}

export default Position;