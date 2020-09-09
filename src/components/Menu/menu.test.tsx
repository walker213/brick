import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './submenu';

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'custom',
};

const createStyleFile = () => {
  const cssFile: string = `
    .bui-menu-submenu-list{
      display:none;
    }
    .bui-menu-submenu-list.menu-opened{
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;

const activeclass = 'bui-menu-item-active';
const disabledclass = 'bui-menu-item-disabled';

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    // wrapper.container相当于 document DOM
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on defalut props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('bui-menu custom');
    // :scope指本身范围
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4);
    expect(activeElement).toHaveClass(activeclass);
    expect(disabledElement).toHaveClass(disabledclass);
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass(activeclass);
    expect(activeElement).not.toHaveClass(activeclass);
    expect(testProps.onSelect).toHaveBeenCalledWith('2');

    // disabled的menuItem不可点击
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass(activeclass);
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup(); // 清除beforeEach的操作
    const testVerticalProps: MenuProps = {
      defaultIndex: '0',
      mode: 'vertical',
    };
    wrapper = render(generateMenu(testVerticalProps));
    menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toBeInTheDocument();
  });
  // it('should throw error when Menu has a child which is not a MenuItem', () => {
  //   expect(() => {
  //     render(
  //       <Menu>
  //         <MenuItem>active</MenuItem>
  //         <MenuItem disabled>
  //           disabled
  //         </MenuItem>
  //         <MenuItem>xyz</MenuItem>
  //         <li>wrong children!</li>
  //       </Menu>,
  //     );
  //   }).toThrow();
  // });

  it('should show dropdown items when hover on subMenu', async () => {
    const dropdownElement = wrapper.getByText('dropdown');
    const dropdownItem = wrapper.getByText('drop1');
    expect(dropdownItem).not.toBeVisible();
    fireEvent.mouseEnter(dropdownElement); // 等待300ms才执行
    // wait会反复执行断言直至通过或者timeout，可以解决异步问题
    await wait(() => {
      expect(dropdownItem).toBeVisible();
    });

    fireEvent.click(dropdownItem);
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');

    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(dropdownItem).not.toBeVisible();
    });
  });

  // 测试vertical submenu点击效果以及默认展开
});
