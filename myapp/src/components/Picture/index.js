import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-images';
import { Row, Col } from 'antd';
import styles from './styles.less';
import lodash from 'lodash';

const defaultOptions = {
  row: {
    gutter: 50,
  },
  col: {
    xs: 24,
    sm: 12,
    md: 12,
    xl: 10,
    xxl: 8,
    style: {
      marginBottom: 16,
    }
  },
}

/**
 * 下拉按钮组件
 * @props imgKey 接口定义key
 * @props enumKey 接口定义key
 * @props enums { key:value }  key => 接口返回的枚举类型 value => 展示名
 * @props dataSource 原始数据源
 * @props options config for row, col
 */

export default class Picture extends Component {
  state = {
    imgKey: 'url',
    enumKey: 'type',
    enums: {},
    options: defaultOptions,
    currentImage: 0,
    lightboxIsOpen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props,
    }
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
  }

  openLightBox = (id) => {
    const currentImage = lodash.findIndex(this.imgGroups, ["id", id]);
    this.setState({
      lightboxIsOpen: true,
      currentImage,
    });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render () {
    const { options, enums, enumKey, imgKey } = this.state;
    const { row, col } = options;
    const { dataSource = [] } = this.props;

    if (!dataSource.length) {
      return ''
    }

    this.imgGroups = dataSource.reduce((arr, item, index) => {
      arr[index] = { src: item[imgKey], id: index, key: index };
      return arr;
    }, []);

    const imgPreviewBox = <Lightbox
      spinner={()=> {return '';}}
      images={this.imgGroups}
      currentImage={this.state.currentImage}
      isOpen={this.state.lightboxIsOpen}
      onClickPrev={this.gotoPrevious}
      onClickNext={this.gotoNext}
      onClose={this.closeLightbox}
    />;

    return (
      <div>
        {imgPreviewBox}
        <Row {...row} >
          {dataSource && dataSource.map((item, index) =>
            <Col {...col} key={index}>
              <div className={styles.picture}>
                <div>{enums[item[enumKey]]}</div>
                <div
                 onClick={this.openLightBox.bind(this, index)}
                 style={{
                  width: '100%',
                  height: '260px',
                  background: `url(${item[imgKey]}) no-repeat center center`,
                  // backgroundRepeat: 'no-repeact',
                  backgroundSize: 'cover',
                  margin: '20px 0',
                }}>
                  {/* <img src={item[imgKey]} alt={enums[item[enumKey]]} onClick={this.openLightBox.bind(this, index)} /> */}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

Picture.propTypes = {
  imgKey: PropTypes.string,
  enumKey: PropTypes.string,
  enums: PropTypes.object,
  dataSource: PropTypes.array,
  options: PropTypes.object,
}
