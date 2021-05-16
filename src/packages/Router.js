import * as React from 'react'
import RouterContext from './RouterContext'
import HistoryContext from './HistoryContext'

class Router extends React.Component {
  // 检测当前路由是否匹配
  static computedRootMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      // history.location 初始是 '/'
      location: props.history.location, // 将 history 的 location 挂载到 state
    }

    // 下面两个变量是防御性代码，防止根组件还没渲染 location 就变了
    // 如果 location 变化时，当前根组件还没渲染出来，就先记下他，等当前组件 mount 了再设置到 state 上
    this._isMounted = false
    this._pendingLocation = null

    // 通过 history 监听路由变化，变化的时候，改变 state 上的 location
    this.unlisten = props.history.listen(location => {
      console.log(location)

      if (this._isMounted) {
        this.setState({ location })
      } else {
        this._pendingLocation = location
      }
    })
  }

  componentDidMount() {
    this._isMounted = true

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation,
      })
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
      this._isMounted = false
      this._pendingLocation = null
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computedRootMatch('/'),
        }}>
        <HistoryContext.Provider children={this.props.children || null} value={this.props.history}></HistoryContext.Provider>
      </RouterContext.Provider>
    )
  }
}

export default Router
