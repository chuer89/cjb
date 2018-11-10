import React from "react";

export const columns =  [
  {
    title: 'farmid',
    dataIndex: 'id',
    key: 'id',
    width:'150'
  },
  {
    title: '农场名称',
    dataIndex: 'farmName',
    key: 'farmName',
    width:'250'
  },
  {
    title: '农场所在地区',
    dataIndex: 'address',
    key: 'address',
    width:'300'
  },
  {
    title: '是否销售',
    dataIndex: 'isSaleDesc',
    key: 'isSaleDesc',
    width:'120'
  },
  {
    title: '农场主',
    dataIndex: 'farmerName',
    type:'whippletree',
    key: 'farmerName',
    width:'150'
  },
  {
    title: '卖家中介',
    dataIndex: 'sellerAgencyName',
    type:'whippletree',
    key: 'sellerAgencyName',
    width:'120'
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatusDesc',
    type:'whippletree',
    key: 'auditStatusDesc',
    width:'150'
  },
  {
    title: '翻译状态',
    dataIndex: 'translateStatusDesc',
    type:'whippletree',
    key: 'translateStatusDesc',
    width:'150'
  },
  {
    title: '出售状态',
    dataIndex: 'saleStatusDesc',
    type:'whippletree',
    key: 'saleStatusDesc',
    width:'150'
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    type: 'datetime',
    key: 'publishTime',
    width:'200',
    sorter: (a, b) =>a.publishTime - b.publishTime
  },
  {
    title: '最后更新时间',
    dataIndex: 'editTime',
    type: 'datetime',
    key: 'editTime',
    width:'200',
    sorter: (a, b) => a.editTime - b.editTime,
  }
]
