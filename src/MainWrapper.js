import React, { PureComponent } from 'react'

class MainWrapper extends PureComponent {

  render() {
    const { children } = this.props

    return (
      <div className="theme-light">
        <div className="wrapper">{children}</div>
      </div>
    )
  }
}

export default MainWrapper
