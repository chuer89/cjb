// 指派
import { Modal, Select, Cascader } from 'antd';
// import _ from 'lodash';

const Designate = ({ visible, onCancel, handleOk, handleChange, structure }) => {
  let { storeStructure } = structure;

  let bChildren = [];
  if (!_.isEmpty(storeStructure) && !_.isEmpty(storeStructure[0].brand)) {
    _.forEach(storeStructure[0].brand, (bItem) => {
      let aChildren = [];
      let bid = '1.' + bItem.bid;

      if (!_.isEmpty(bItem.area)) {
        _.forEach(bItem.area, (aItem) => {
          let sChildren = [];
          let aid = bid + '.' + aItem.aid;

          if (!_.isEmpty(aItem.store)) {
            _.forEach(aItem.store, (sItem) => {
              sChildren.push({
                value: sItem.index,
                label: sItem.sname,
              });
            });
          }

          aChildren.push({
            value: aItem.index,
            label: aItem.aname,
            children: sChildren,
          });
        });
      }

      bChildren.push({
        value: bItem.index,
        label: bItem.bname,
        children: aChildren,
      });
    });
  }

  let deptOpt = {
    options: bChildren,
    onChange: handleChange,
    placeholder: '选择部门',
    notFoundContent: '无筛选部门',
    expandTrigger: 'hover',
    changeOnSelect: true,
  }

  return (
    <Modal
      title="课程指派"
      width={500}
      destroyOnClose={true}
      visible={visible}
      centered={true}
      onOk={handleOk}
      onCancel={onCancel}>
      <div style={{ padding: '20px 0 50px 50px' }}>
        <Cascader {...deptOpt} />
      </div>
    </Modal>
  )
}

export default Designate;
