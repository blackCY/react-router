function createEvents() {
    let handlers = [];

    return {
        push(fn) {
            handlers.push(fn);

            //  返回 unlisten 函数 
            return function () {
                handlers = handlers.filter((handler) => handler !== fn);
            };
        },
        // 路由变化时会触发
        call(arg) {
            handlers.forEach((fn) => fn && fn(arg));
        },
    };
}

export function createBrowserHistory() {
    const handlers = createEvents();

    // 初始化 location
    let location = {
        pathname: "/",
    };

    //  路由变化时的回调
    const handlePop = () => {
        const currentLocation = {
            location: window.location.pathname,
        };
        handlers.call(currentLocation); // 路由变化时执行回调
    };

    //  监听 popstate 事件
    //  由于只有浏览器的前进后退能触发 popstate 事件，所以这里我们监听这个事件是为了处理浏览器的前进后退
    window.addEventListener("popstate", handlePop);

    //  返回的 history 上有个 listen 方法
    const history = {
        listen(listener) {
            return handlers.push(listener);
        },
        location,
    };

    return history;
}
