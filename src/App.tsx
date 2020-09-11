import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/submenu';

import Icon from './components/Icon/icon';

function App() {
  return (
    <div>
      <section>
        <h1>Button</h1>
        <Button btnType="primary">primary</Button>
        <Button btnType="danger">danger</Button>
        <Button btnType="default" size="lg">
          default && lg
        </Button>
        <Button disabled size="sm">
          disabled && sm
        </Button>
        <Button btnType="link" href="https://www.baidu.com" target="_blank">
          百度
        </Button>
        <Button btnType="link">百度無連接</Button>
        <Button btnType="link" href="https://www.baidu.com" disabled>
          disabled link
        </Button>
      </section>

      <section>
        <h1>Icon</h1>
        <Icon icon="coffee" theme="danger" size="10x" />
      </section>

      <section>
        <h1>Menu</h1>
        <Menu>
          <MenuItem disabled>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </Menu>
        <Menu mode="vertical">
          <MenuItem disabled>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </Menu>
        <Menu mode="vertical" defaultOpenSubMenus={['1']}>
          <MenuItem disabled>1</MenuItem>
          <SubMenu title="vertical">
            <MenuItem disabled>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </SubMenu>
          <MenuItem>3</MenuItem>
        </Menu>
        <Menu>
          <MenuItem disabled>1</MenuItem>
          <SubMenu title="horizontal">
            <MenuItem disabled>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </SubMenu>
          <MenuItem>3</MenuItem>
        </Menu>
      </section>
    </div>
  );
}

export default App;
