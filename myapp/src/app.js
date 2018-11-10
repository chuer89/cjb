import { message } from 'antd';
message.config({
  maxCount: 1,
});
export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e);
      message.error(e.message);
    },
  },
};