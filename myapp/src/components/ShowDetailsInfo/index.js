import React from 'react'
import {Row, Col} from 'antd'
import {DetailsInfoItem} from './../detailsInfoItem';
export default ({detailsInfo}) => {
  return (detailsInfo && detailsInfo.map((item, $index) =>{
      return <Row key={$index} style={{marginBottom: 10, marginTop: 10}}>
        <DetailsInfoItem {...{item}}/>
      </Row>
    }) || null
  );
}
