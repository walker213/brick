import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  );
};

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'custom',
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
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on defalut props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('bui-menu custom');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass(activeclass);
    expect(disabledElement).toHaveClass(disabledclass);
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass(activeclass);
    expect(activeElement).not.toHaveClass(activeclass);
    expect(testProps.onSelect).toHaveBeenCalledWith(2);

    // disabled的menuItem不可点击
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass(activeclass);
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup(); // 清除beforeEach的操作
    const testVerticalProps: MenuProps = {
      defaultIndex: 0,
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
  //         <MenuItem index={0}>active</MenuItem>
  //         <MenuItem index={1} disabled>
  //           disabled
  //         </MenuItem>
  //         <MenuItem index={2}>xyz</MenuItem>
  //         <li>wrong children!</li>
  //       </Menu>,
  //     );
  //   }).toThrow();
  // });
});
