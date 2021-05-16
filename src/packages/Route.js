import * as React from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location
          const match = this.props.computedMatch ? this.props.computedMatch : matchPath(location.pathname, this.props) // 调用 matchPath 检测当前路由是否匹配

          const props = {
            ...context,
            location,
            match,
          }

          let { component } = this.props

          //  render 对应的 component 之前先用最新的参数 match 更新下 RouterContext
          //  这样下层嵌套的 Route 可以拿到对的值
          return <RouterContext.Provider value={props}>{props.match ? React.createElement(component, props) : null}</RouterContext.Provider>
        }}
      </RouterContext.Consumer>
    )
  }
}

export default Route
