import React from 'react'
import {Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Input, Icon } from 'antd'

import MyFooter from './footer/Footer'

import Home from '@pages/home/Home.jsx'
import Category from '@pages/category/Category.jsx'
import Label from '@pages/label/Label.jsx'
import Archive from '@pages/archive/Archive.jsx'
import Transshipment from '@pages/transshipment/Transshipment.jsx'
import OpenSource from '@pages/openSource/OpenSource.jsx'
import About from '@pages/about/About.jsx'

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

  render() {

    return (
      <Layout className="basic-layout">
        <Header className="basic-layout-header">
          <i className="iconfont icon-logo logo" />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="menu"
          >
            <Menu.Item key="1">
              <Link to='/home'>首页</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/category'>分类</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/label'>标签</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='/archive'>归档</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to='/transshipment'>转载</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to='/openSource'>开源</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to='/about'>关于</Link>
            </Menu.Item>

            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  更多<Icon type="down" style={{ fontSize: 12, marginRight: 4 }}/>
                </span>
              }
            >
              <Menu.Item key="52">建议</Menu.Item>
              <Menu.Item key="53">工具</Menu.Item>
            </SubMenu>
          </Menu>
          <Search
            placeholder=""
            onSearch={value => console.log(value)}
            className="search"
          />
          <i className="iconfont icon-user admin" />
        </Header>

        <Content className="basic-layout-content">
          <div className='content'>
            <div className='left'>
              <div className='card'>
                <Switch>
                  <Route
                    extra
                    key='1'
                    path={'/home'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='2'
                    path={'/category'}
                    component={Category}
                  />
                  <Route
                    extra
                    key='3'
                    path={'/label'}
                    component={Label}
                  />
                  <Route
                    extra
                    key='4'
                    path={'/archive'}
                    component={Archive}
                  />
                  <Route
                    extra
                    key='5'
                    path={'/transshipment'}
                    component={Transshipment}
                  />
                  <Route
                    extra
                    key='6'
                    path={'/openSource'}
                    component={OpenSource}
                  />
                  <Route
                    extra
                    key='7'
                    path={'/about'}
                    component={About}
                  />
                </Switch>
              </div>
              <div className='card'></div>
            </div>
            <div className='right'>
              <div className='card'>11111</div>
              <div className='card'>22222</div>
              <div className='card'>33333</div>
            </div>
          </div>
        </Content>
        <Footer className="basic-layout-footer">
          <MyFooter/>
        </Footer>
      </Layout>

    )
  }
}

export default BasicLayout
