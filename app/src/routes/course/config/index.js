import React from 'react';
import App from '../../app';

import SearchConfig from './components/search';

class CourseConfig extends React.Component {
  state = {

  }

  render() {
    return (
      <App>
        <div><SearchConfig /></div>
        <div>培训管理</div>
      </App>
    )
  }
}

export default CourseConfig;