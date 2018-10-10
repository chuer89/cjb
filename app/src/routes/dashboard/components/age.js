import ReactEcharts from 'echarts-for-react';
import common from '../../../common';

const Age = () => {
  let data = [{
    star: 5, percent: 85,
  }, {
    star: 4, percent: 60,
  }, {
    star: 3, percent: 32,
  }, {
    star: 2, percent: 44,
  }, {
    star: 1, percent: 8,
  }];
  let renderData = data.map((item, index) => {
    return (
      <div className={style.box} key={index}>
        <div className={style.item}>
          <span>
            <Rate disabled value={item.star} />
            <span className="ant-rate-text">{item.star}星</span>
          </span>
        </div>
        <div className={style.itemProgress}>
          <Progress percent={item.percent} status="active" />
        </div>
      </div>
    )
  });

  return (
    <Card title="员工满意度">
      <div className={style.content}>{renderData}</div>
    </Card>
  )
}

export default Age;