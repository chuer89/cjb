import { source } from 'config';
import styles from './styles.less';
import classnames from 'classnames';

const { informs } = source;

const Header = ({
  userInfo, custom = {}, userCustom, farmDetail,
}) => {
  const { inform = 3 } = custom;
  const { isAuthAgent } = userCustom;
  const { realName, mobile } = userInfo;
  const { isOpenAnimalService } = farmDetail;
  return (
    <div className={styles["contact-header"]}>
      <div className={styles["contact-header-users"]}>
        <div className={styles["contact-header-name"]}>{realName || mobile}</div>
        {parseInt(isAuthAgent, 10) === 2 && <i className="iconfont">&#xe6a0;</i>}
        {parseInt(inform, 10) === 5 && <i className={classnames("iconfont", { [styles["grey-icon"]]: !isOpenAnimalService })}>&#xe6ae;</i>}
        {inform && <img className={styles.img} src={informs[inform]} alt=""/>}
      </div>
    </div>
  );
}

export default Header;