import { Modal, Button, Spin } from 'antd';
import { ImageLazy} from 'components';
import styles from './Detail.less';

import {api} from 'config';

const listrender = (label, content) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listTitle}>
        {label}
      </div>
      <div className={styles.listContent}>
        {content}
      </div>
    </li>
  );
};

const Detail = ({visible,onCancel,data, showBtn = true, onPublish, loading}) => {
  const {
    farmName = "",
    img = "",
    sellerAgencyHead = "",
    sellerAgencyName = "",
    sellerAgencyTel = "",
    address = "",
    priceUnit = '',
    rawTotalPrice = '',
    areaUnit = '',
    farmType = '',
    rawUnitPrice = '',
    rawArea = '',
    content= "",
    landRights = "",
    isResidential = "",
    soilType= "",
    waterRights = "",
    regulations = "",
    disadvantage= "",
    id,
  } = data;


  const gotoFarmPublish = () => {
    onPublish&&onPublish(id);
  };


  const {defaultImg} = api;
  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      onCancel={onCancel}
      title="农场详情"
      width={888}
      footer={null}
    >
      <Spin spinning={loading}>
        <header className={styles.imgGroup} >
          <ImageLazy
            src={img}
            defaultSrc= {defaultImg}
            defaultImgStyle = {{width: '100px'}}
            style={{ background: 'rgb(227, 227, 227)', height: 'auto'}}
          />
        </header>

        <h1 title={farmName} className={styles.farmTitle}>
          {farmName}
        </h1>
        <p className={styles.address}>
          <i className={"iconfont icon"}>&#xe663;</i>
          {address}
        </p>
        <p className={styles.price}>
          {rawTotalPrice && `${priceUnit} ${rawTotalPrice}`}
        </p>
        {farmType || rawUnitPrice || rawArea && <div className={styles.otherContainer}>
          { farmType && <div className={styles.otherContainerList}>
            <i className="iconfont icon">&#xe650;</i>
            <span>{farmType}</span>
          </div>}
          { rawUnitPrice && <div className={styles.otherContainerList}>
            <i className="iconfont icon">&#xe650;</i>
            <span>{`${rawUnitPrice}/${areaUnit}`}</span>
          </div>}
          {rawArea && <div className={styles.otherContainerList}>
            <i className="iconfont icon">&#xe658;</i>
            <span>{`${rawArea}${areaUnit}`}</span>
          </div>}
        </div>}
        <div className={styles.photo}>
          <ImageLazy
            src={sellerAgencyHead}
            defaultSrc= {defaultImg}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          />
          {(sellerAgencyTel || sellerAgencyName) && <div className={styles.sellerBrokerContainer}>
            <p className={styles.sellerBrokerName} dangerouslySetInnerHTML={{ __html: sellerAgencyName }}></p>
            <p className={styles.sellerBrokerTel}>
              {sellerAgencyTel && <i className="iconfont icon">&#xe64f;</i>}
              {sellerAgencyTel}
          </p>
          </div>}
        </div>
        <div className={styles.farmDescContainer}>
          <p className={styles.farmDescContainerTitle}>
            农场介绍
          </p>
          <p className={styles.farmDescContainerTxt}>
            {content}
          </p>
        </div>
        <ul className={styles.listContainer}>
          {landRights && listrender('土地性质', landRights)}
          {isResidential && listrender('是否住宅用地', isResidential)}
          {soilType && listrender('土壤类型', soilType)}
          {waterRights && listrender('水权介绍', waterRights)}
          {regulations && listrender('土地使用规定介绍', regulations)}
          {disadvantage && listrender('杂草和害虫', disadvantage)}
        </ul>
        <div className={styles.btnContainer}>
          {showBtn ? <Button onClick={gotoFarmPublish} type="primary">去发布</Button>: null}
        </div>
      </Spin>
    </Modal>
  );
};

export default Detail;
