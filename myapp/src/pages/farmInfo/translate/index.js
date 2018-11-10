import React, {Component} from 'react';
import {Form, Button, message} from 'antd';
import {connect} from 'dva';
import {Page} from 'components';
import router from 'umi/router';
import InputCard from './../translateCard';
import UpModal from './UpModal';

import styles from './index.less';


class TranslateFarm extends Component {
  state = {
    imgError: null, // 是否有选择图片
    messageShow: false,
    upModalProps: {},
  }


  // 取消发布 返回农场列表
  onClancel = () => {
    this.setState({
      messageShow: true,
      upModalProps: {
        message: '取消发布后，当前编辑信息将丢失！',
        icon: null,
        onCancel: () => {
          this.setState({messageShow: false});
        },
        onOk: () => {
          router.push('/farmInfo');
        },
      },
    });

  }

  // 发布农场
  onPublish = () => {
    const {validateFieldsAndScroll} = this.props.form;
    validateFieldsAndScroll((err, values) => {
      if (err) {
        message.error('信息填写不完整！');
        return;
      }

      const data = values;

      const params = {
        id: this.props.translate.id,
        farmName: data['zh-farmName'], // 名称
        farmNameEn: data['en-farmName'], // 英文名称
        address: data['zh-framAddress'] ? data['zh-framAddress'].address : undefined, // 地址
        addressEn: data['en-framAddress'] ? data['en-framAddress'].address : undefined, // 英文地址
        content: data['zh-framIntroduction'], // 中文介绍
        contentEn: data['en-framIntroduction'], // 英文介绍
        waterRights: data['en-waterIntroduction'], // 水权介绍中文
        waterRightsEn: data['zh-waterIntroduction'], // 水权介绍英文
        regulations: data['zh-landUseIntroduction'], // 土地使用规定中文
        regulationsEn: data['en-landUseIntroduction'], // 引文
        disadvantage: data['zh-weedsAndPests'], // 杂草害虫中文
        disadvantageEn: data['en-weedsAndPests'], // yingwen
      };
      // 去空
      for(let key in params) {
        if(!params[key]) {
          delete params[key]
        }
      }
      this.props.dispatch({
        type: 'translate/save',
        payload: params,
        onOk: () => {
          const back = () => {
            this.setState({
              messageShow: false,
            });
            router.push('/farmInfo');
          };
          this.setState({
            messageShow: true,
            upModalProps: {
              message: '农场发布成功',
              icon: <i className="iconfont success">&#xe679;</i>,
              onOk: back,
            },
          });
          // 农场上传成功后秒关闭弹框 跳转页面
          setTimeout(() => {
            back();
          }, 3000);
        },
        onError: () => {
          const back = () => {
            this.setState({
              messageShow: false,
            });
          };

          this.setState({
            upModalProps: {
              messageShow: true,
              message: '农场发布失败',
              icon: <i className="iconfont error">&#xe62f;</i>,
              onOk: back,
            },
          });
          // 农场上传成功后秒关闭弹框 跳转页面
          setTimeout(() => {
            back();
          }, 3000);
        },
      });
    });
  }

  render() {
    const {translate: {translateData}} = this.props;
    const {messageShow, upModalProps} = this.state;
    if (!translateData) {
      return null;
    }
    const {languageType} = translateData;

    const inputCardProps = {
      translateData,
      enDisabled: languageType === 2,
      zhDisabled: languageType === 1,
      baseDataIsRequired: true,
      form: this.props.form,
      soilTypeEn:[],
      soilTypeZh:[],
      onChange: (data) => {
        console.log(data);
      },
    };

    return (
      <Page inner
            loading={false}
            className={styles.EditorContainer}>
        <header className={styles.head}>
          <span className={styles.pageTitle}>农场列表/发布农场</span>
          <div>
            <Button onClick={this.onClancel}>取消发布</Button>
            <Button type="primary" onClick={this.onPublish}>发布</Button>
          </div>
        </header>
        <div>
          {translateData && <InputCard {...inputCardProps} />}
        </div>
        {messageShow && <UpModal {...upModalProps}/>}
      </Page>
    );
  }
}


export default connect(({translate, loading, commonType}) => ({
  translate,
  loading,
  commonType
}))(Form.create()(TranslateFarm));
