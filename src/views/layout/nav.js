import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
const { SubMenu } = Menu;

@withRouter
class Nav extends React.Component {
  openKeysMap = { // 添加路由需要在此维护submenu展开状态
    userManage: 'p-user',
    publicFactor: 'p-research',
  }
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      openKeys: [],
    };
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    const { history } = this.props;
    this.setState({
      current: pathname.slice(1),
      openKeys: [this.openKeysMap[pathname.slice(1)]]
    });
    history.listen((e) => {
      this.setState({
        current: e.pathname.slice(1),
      });
      if (this.state.openKeys.length < 1) {
        this.setState({
          openKeys: [this.openKeysMap[e.pathname.slice(1)]]
        });
      }
    });
  }
  handleOpenChange = e => {
    this.setState({
      openKeys: e
    });
  };
  render() {
    return (
      <Menu
        style={{ width: 256 , height: '100%'}}
        selectedKeys={[this.state.current]}
        multiple={false}
        openKeys = {this.state.openKeys}
        onOpenChange = {this.handleOpenChange}
        mode="inline"
      >
        <SubMenu
          key="p-user"
          title={
            <span>
              <Icon type="user" />
              <span>用户管理</span>
            </span>
          }
        >
          <Menu.Item key="userManage">
            <Link to="/userManage">用户管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="p-research"
          title={
            <span>
              <Icon type="fund" />
              <span>研究管理</span>
            </span>
          }
        >
          <Menu.Item key="publicFactor">
            <Link to="/publicFactor">公共因子</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Nav;
