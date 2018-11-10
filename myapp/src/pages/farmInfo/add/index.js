import React from 'react'
import {Card} from 'antd'
import {FormItem} from 'components'
import moment from 'moment';
import {itemConfig} from './itemConfig';
import {connect} from 'dva'

function mergeConfig({queryCondition, config, title}) {
  let _All = {}
  const index = queryCondition.findIndex((value, index, arr) => value.title === title)
  if (index > -1) {
    Object.assign(_All, queryCondition[index]['componentsConfig'], config);
  }
  queryCondition[index]['componentsConfig'] = _All;
  return {queryCondition, index};
}

class AddFarm extends React.Component {
  constructor(props) {
    super(props)
    this.actions = this.props.actions;

  }

  onSave = (payload) => {
    // 对省市区进行处理
    let {site, purchaseTime, iLng, iLat} = payload;
    let nationId = '';
    let provinceId = '';
    let cityId = '';
    const AMap = window.AMap;
    const convertFrom = ['gps', 'baidu', 'mapbar'];
    if (site.length > 2) {
      cityId = site[2];
    }
    nationId = site[0];
    provinceId = site[1];
    const {
      ownerUserId,
      farmName,
      area,
      type,
      totalRmb,
      address,
      translateStatus
    } = payload;
    purchaseTime = moment(purchaseTime, 10).format('YYYY-MM-DD');
    if (parseInt(translateStatus) === 2) {
      this.actions.saveFarms({
        ownerUserId,
        farmName,
        area,
        type,
        totalRmb,
        purchaseTime,
        nationId,
        provinceId,
        cityId,
        address,
        lng: iLng,
        lat: iLat
      })
      return;
    }
    AMap.convertFrom([iLng, iLat], convertFrom[parseInt(translateStatus)], (status, result) => {
      if (result.info === 'ok') {
        const lnglats = result.locations;
        const {lng, lat} = lnglats[0];
        this.actions.saveFarms({
          ownerUserId,
          farmName,
          area,
          type,
          totalRmb,
          purchaseTime,
          nationId,
          provinceId,
          cityId,
          address,
          lng,
          lat
        })
      }
    });
  }
  handleFarmersSearch = (value) => {
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      this.actions.getFarms({mobileOrUserId: value});
    }, 300);
  }
  handleFarmersChange = (value) => this.actions.updateFarms(value);

  render() {
    const {
      queryCondition
    } = itemConfig;
    const {addFarm: {farmers, farmersInputValue}} = this.props;
    const _farmers = {
      showSearch: true,
      onSearch: this.handleFarmersSearch,
      onChange: this.handleFarmersChange,
      notFoundContent: null,
      placeholder: '请选择农场主'
    }
    const {index} = mergeConfig({queryCondition, 'config': _farmers, 'title': 'ownerUserId'});
    queryCondition[index].selectCondition = farmers;
    queryCondition[index].itemConfig.initialValue = farmersInputValue;
    return (<>
      <Card title="基础信息" bordered={false} style={{width: '100%'}}>
        <div>
          <FormItem {...{
            queryCondition,
            onSave: this.onSave
          }}/>
        </div>
      </Card></>)
  }
}

const mapStateToProps = ({addFarm, loading}) => ({addFarm, loading})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateFarms(query) {
        dispatch({
          type: 'addFarm/updateFarms',
          payload: query,
        });
      },
      getFarms(query) {
        dispatch({
          type: 'addFarm/getFarmer',
          payload: query,
        });
      },
      saveFarms(query) {
        dispatch({
          type: 'addFarm/saveFarm',
          payload: query,
        });
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFarm);
