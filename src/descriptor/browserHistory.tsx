import React from 'react';
import { createBrowserHistory, UnregisterCallback } from 'history';

/* 
  browserHistory 也叫浏览器历史对象，特点为其 location 的 pathname，search 等与浏览器中的 window.location 对象的各属性完全兼容
  const history = createBrowserHistory()
  history.location.pathname === window.location.pathname // true

  history 里 BrowserHistory 配置如下
  export interface BrowserHistoryBuildOptions {
    basename?: string;
    对于 browserHistory，默认的跳转不会造成刷新页面，如果设置forceRefresh 为 true，则在跳转过程中会强制刷新页面  
    forceRefresh?: boolean;
    getUserConfirmation?: typeof getConfirmation;
    历史栈中栈记录的 key 字符串的长度，默认为 6
    keyLength?: number;
  }
*/

// 创建基准路径 history
const history = createBrowserHistory({ basename: '/base/foo' });
history.push('/baz');
console.log(window.location.pathname); // 浏览器地址栏路径 => '/base/foo/baz' 包含基准路径
console.log(history.location.pathname); // '/baz' // history 对象中的 pathname => '/baz' 不包含基准路径

// 对于浏览器路径，同样会剥离 basename
// basename 会忽略大小写
// const history = createBrowserHistory({ basename: '/PREFIX' });
// window.history.replaceState(null, '', '/prefix/pathname');
// console.log(history.location.pathname); // /pathname

// 如果在创建 history 的时候传入了 basename，则通过 createHref，history.push 和 history.replace 等方法都会得到 basename 和 path 的拼接
const href = history.createHref({
  pathname: '/path',
  search: '?the=query',
  hash: '#the-hash',
});
console.log(href); // '/base/foo/path?the=query#the-hash'

function App() {
  // 保存注销函数
  const historyUnBlockCb = React.useRef<UnregisterCallback>(() => {});

  React.useEffect(() => {
    return () => {
      // 注销 history.block()
      historyUnBlockCb.current();
    };
  }, []);

  function block() {
    // 解除之前的阻止
    historyUnBlockCb.current();
    // 重新设置弹框确认，更新注销函数，单击 确定 按钮则正常跳转，单击 取消 按钮则跳转不生效
    historyUnBlockCb.current = history.block('是否继续?');
  }

  return (
    <>
      <button onClick={block}>阻止跳转</button>
      <button
        onClick={() => {
          historyUnBlockCb.current();
        }}>
        解除阻止
      </button>
    </>
  );
}

export default App;
