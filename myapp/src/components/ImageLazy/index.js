import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import {Spin} from 'antd';

class ImageLazy extends Component {
  constructor (props) {
    super(props);
    this.state = {
      src: props.src,
      isSuccess: false,
      defaultSrc: props.defaultSrc,
      loading: true,
      hasLoad: false,
    };
  }
  componentDidMount () {
    const {src} = this.state;
    if(src) {
      this.onLoad(src);
    } else {
      this.setState({loading: false});
    }

  }
  UNSAFE_componentWillReceiveProps ({src, defaultSrc}) {
    if(src !== this.state.src) {
      if(src) {
        this.setState({src, defaultSrc,loading: true,isSuccess: false});
        this.onLoad(src);
      }
    }
  }

  onLoad = (src) => {
    const {hasLoad} = this.state;
     if(hasLoad) {
       return '';
     }
    this.setState({hasLoad: true});
    const img = new Image();

    img.src = src;

    img.onload = () => {
      // console.log('loading success');
      this.setState({isSuccess: true, loading: false});
    };
    img.onerror = () => {
      this.props.onError&&this.props.onError();
      this.setState({isSuccess: false,loading: false});
    };
  }

  render () {
    const {isSuccess, src, defaultSrc, loading} = this.state;
    const {style,defaultImgContainerStyle, defaultImgStyle} = this.props;

    return (
      <div className={styles.imageLazyContainer} style={style}>
        <Spin spinning={loading} style={{height: "100%"}}>
          {isSuccess ?
            <div className={styles.ImgContainer}><img className={styles.img} src={src} alt="img" /></div>
            :<div className={styles.defaultImgContainer} style={defaultImgContainerStyle}>
              <img  src={defaultSrc} style={defaultImgStyle} alt="defaultImg" />
            </div>
            }
        </Spin>
      </div>
    );
  }
}

ImageLazy.propTypes = {
  src: PropTypes.string,
  defaultSrc: PropTypes.string,
  onError: PropTypes.func,
  w_h: PropTypes.number,
  style:  PropTypes.object,
  defaultImgContainerStyle: PropTypes.object,
  defaultImgStyle: PropTypes.object,
};

export default ImageLazy;
