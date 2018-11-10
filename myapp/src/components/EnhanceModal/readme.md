## 普通模态框
```javascript
export default class Test extend React.component {
  constructor(props){
    super(props);
    this.state = {
      state: false
    }
  }

  handleModal() {
    this.state = {
      visible: Symbol()
    }
  }

  render() {
    const { visible } = this.state

    const modalProps = {
      visible,
      onCancel: ()=> console.log('...'),
      onOk: ()=> console.log('...'),
    }

    return (
      <div>
        <Button type="primary" onClick={() => this.handleModal()}>普通模态框</Button>
        { visible && <EnhanceModal {...modalProps} />}
      <div>
    )
  }

}

```

## confirmLoading modal

```javascript
export default class ModalBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    handleModal() {
        this.setState({visible: Symbol()});
    }

    handleSave() {
      // 调用modeleffects..
    }

    render() {
        const {visible} = this.state;
        const { confirmLoading } = this.props;
        const modalProps = {
            visible,
            confirmLoading,
            onOk: () => this.handleSave()
        }
        return (
            <div>
                <Button type="primary" onClick={() => this.handleModal()}>confirmLoading模态框</Button>
                <EnhanceModal {...modalProps}/>
            </div>
        );
    }
}
```