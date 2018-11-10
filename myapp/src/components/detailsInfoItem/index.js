import React from 'react'
import {Col} from 'antd'

const defaultColConfig = {
  xs: 24,
  sm: 12,
  md: 12,
  xl: 10,
  xxl: 8,
  style: {
    marginBottom: 16,
  }
};
export const DetailsInfoItem = ({item}) => {
  return (<><Col><h2 style={{fontWeight: 700}}>{item.title}</h2></Col>
    {item.item && item.item.map((_item, index) => <Col key={index} {...{...defaultColConfig, ..._item.ColConfig}}>
      <div>
        {_item.label ? <label>{_item.label}:</label> : null}
        {Object.keys(_item).map(($item, _index) => {
          if ($item === 'content') {
            return <span key={_index}
                         style={{paddingLeft: 10}}>{_item[$item]}{_item['unit'] ? _item['unit'] : null}</span>
          }

          if ($item === 'imgUrl') {
            return <div key={$item} style={{marginTop: 10}}><img src={_item[$item]} width='200' alt={_item.label}/>
            </div>
          }
        })}
      </div>
    </Col>)}</>)
}
