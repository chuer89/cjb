// 指派
import { Modal } from 'antd';
import DeptSele from '@components/seleDept/';

const Designate = ({ visible, onCancel, handleOk, handleChange, structure, userType }) => {
  let deptOpt = {
    structure,
    userType,
    onChange: handleChange,
    getPopupContainerId: 'js_sele_designate',
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
        <DeptSele {...deptOpt} />
        <div id="js_sele_designate"></div>
      </div>
    </Modal>
  )
}

export default Designate;
