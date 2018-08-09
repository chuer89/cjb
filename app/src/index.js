import "babel-polyfill";
import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import 'nprogress/nprogress.css'

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
