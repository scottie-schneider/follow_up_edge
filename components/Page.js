import React, { Component } from "react"
import Head from "./Head"

class Page extends Component {
  render() {
    return (
      <div>
        <Head />
        <main>{this.props.children}</main>
      </div>
    )
  }
}

export default Page
