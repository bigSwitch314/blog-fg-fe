import React from 'react'
import { Layout, Menu, Input, Icon } from 'antd'
import './BasicLayout.less'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu
const { Search } = Input

class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'mail',
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  handleFocus() {
    const search = document.getElementById('search')
    let width = search.attributes.id.ownerElement.clientWidth
    width += 20
    console.log(width)
    search.style.width = width + 'px'
  }

  render() {

    return (
      <Layout className="basic-layout">
        <Header className="basic-layout-header">
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="1"> 首页 </Menu.Item>
            <Menu.Item key="2"> 分类 </Menu.Item>
            <Menu.Item key="3"> 标签 </Menu.Item>
            <Menu.Item key="4"> 归档 </Menu.Item>
            <Menu.Item key="5"> 转载 </Menu.Item>
            <Menu.Item key="6"> 开源项目 </Menu.Item>
            <Menu.Item key="7"> 关于 </Menu.Item>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  更多<Icon type="down" style={{ fontSize: 12, marginRight: 4 }}/>
                </span>
              }
            >
              <Menu.Item key="81">后台</Menu.Item>
              <Menu.Item key="52">专栏</Menu.Item>
              <Menu.Item key="53">工具</Menu.Item>
            </SubMenu>
          </Menu>
          <Search
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            id="search"
            placeholder=""
            onSearch={value => console.log(value)}
            className="search"
          />
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
