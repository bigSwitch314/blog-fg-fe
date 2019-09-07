import React from 'react'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

import './BasicLayout.less'


class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <Layout className="basic-layout">
        <Header className="basic-layout-header">
          Header
        </Header>
        <Content className="basic-layout-content">
          Content
        </Content>
        <Footer className="basic-layout-footer">
          Footer
        </Footer>
      </Layout>

    )
  }
}

export default BasicLayout
