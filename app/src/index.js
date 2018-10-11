import "babel-polyfill";
import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

import 'nprogress/nprogress.css'
import nprogressDva from 'dva-nprogress';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());
app.use(nprogressDva());

// 3. Model
app.model(require('./models/app').default);
app.model(require('./models/user').default);
app.model(require('./models/structure').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
