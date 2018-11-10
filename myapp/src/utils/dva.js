// 缓存dva app对象
export function store(dvaApp) {
  return (window.$$dvaApp = dvaApp);
}

// 获取对应的effect函数
export function getEffect(effectName, curNamespace) {
  const targetNamespace = effectName.includes('/') ? effectName.split('/')[0] : curNamespace;
  const targetEffectName = effectName.includes('/') ? effectName : `${curNamespace}/${effectName}`;
  const targetModel = window.$$dvaApp._models.find(({ namespace }) => namespace === targetNamespace);
  return targetModel.effects[targetEffectName];
}
