export function getAllAccount (obj) {
  if (!obj) {
      return;
  }
  if (!Array.isArray(obj)) {
      obj = [obj];
  }
  var array = [];
  for (var i = obj.length - 1; i >= 0; i--) {
      array.push(obj[i].to);
      if (obj[i].attach) {
          if (obj[i].attach.accounts) {
              for (var j = obj[i].attach.accounts.length - 1; j >= 0; j--) {
                  array.push(obj[i].attach.accounts[j]);
              };
          }
      }
  };
  return array;
}


export function getUserAvatar (account, data) {
    return data.reduce((obj, item) => {
      if(item.account === account) {
        obj = item;
      }
      return obj;
    }, {});
  }