import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Link from 'umi/link';
import styles from './404.less';

function IndexPage() {
  return (
    <div className={styles.content}>
      <div className={styles.number}>404</div>
      <div className={styles.tips}>页面找不到</div>
      <div>
        <Link to="/personnel/workbench">
          <Button type="primary">返回首页</Button>
        </Link>
      </div>
    </div>
  );
}

export default connect()(IndexPage);
