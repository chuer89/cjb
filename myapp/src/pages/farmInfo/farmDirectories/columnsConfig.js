import React from "react";
import styles from "./index.less";

const imgError = (e) => {
  e.target.setAttribute("src",require('./../../../assets/defaultImg.png'));
}
const renderImgContainer = (src) => {
  return (
    <div className={styles.imgContainer}>
      <img alt="farmImage" onError={e => imgError(e)} height={54} src={src}/>
    </div>
  );
};
export const columns = (onClick) => [
  {
    title: '农场图片',
    width: 120,
    dataIndex: 'img',
    key: 'img',
    render: (a, b) => renderImgContainer(b.img ? b.img : require('./../../../assets/defaultImg.png')),
  },
  {
    title: '农场名称',
    width: 300,
    dataIndex: 'farmName',
    key: 'farmName',
  },
  {
    title: '农场总价(￥)',
    width: 120,
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: '操作',
    width: 50,
    key: 'action',
    render: (text, record) => {
      const {id} = record;
      return <a href="javascript:;" onClick={() => onClick(id)}>详情</a>
    }
  },
];
