import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu');

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  // 如何给MenuProps扩展原生属性？
  defaultIndex?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
  className?: string;
}

interface IMenuContext {
  currentActiveIndex: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ currentActiveIndex: '0' });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex = '0',
    mode,
    style,
    onSelect,
    defaultOpenSubMenus,
    className,
    children,
    ...restProps
  } = props;
  const [currentActive, setActive] = useState<string>(defaultIndex);
  const classes = classnames(
    getFullClassName(),
    mode === 'vertical' ? getFullClassName('vertical') : getFullClassName('horizontal'),
    className,
  );
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passContext: IMenuContext = {
    currentActiveIndex: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    // React.Children.map用于遍历children，如遇到不可遍历的children会自动跳过？
    return React.Children.map(children, (child, index) => {
      // 断言child 为 React.FunctionComponentElement
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu')
        return React.cloneElement(childElement, { index: index.toString() });
      throw new Error('error:Menu has a child which is not a MenuItem component');
    });
  };

  return (
    // testid便于testing-library测试
    <ul className={classes} style={style} {...restProps} data-testid="test-menu">
      <MenuContext.Provider value={passContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
