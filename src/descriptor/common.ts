/* 
对于 browserHistory hashHistory 以及 memoryHistory，它们的通用能力可用同样的 history 对象进行描述
*/
export interface History<HistoryLocationState = LocationState> {
  // 历史栈长度
  length: number;
  // 最后一次导航行为
  action: Action;
  // 当前历史地址
  location: Location<HistoryLocationState>;
  // 添加历史栈记录
  push(path: Path, state?: HistoryLocationState): void;
  // 添加历史栈记录重载方法
  push(location: LocationDescriptorObject<HistoryLocationState>): void;
  // 修改历史栈记录
  replace(path: Path, state?: HistoryLocationState): void;
  // 修改历史栈记录重载方法
  replace(location: LocationDescriptorObject<HistoryLocationState>): void;
  // 移动栈指针
  go(n: number): void;
  // go(-1)
  goBack(): void;
  // go(1)
  goForward(): void;
  // 阻止导航行为
  block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
  // 监听地址变化
  listen(listener: LocationListener): UnregisterCallback;
  // 地址对象转换
  createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}
