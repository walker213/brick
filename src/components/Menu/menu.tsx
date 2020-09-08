import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu');

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: number) => void;
export interface MenuProps {
  // 如何给MenuProps扩展原生属性？
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  className?: string;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex = 0, mode, style, onSelect, className, children, ...restProps } = props;
  const [currentActive, setActive] = useState<number>(defaultIndex);
  const classes = classnames(
    getFullClassName(),
    { [getFullClassName('vertical')]: mode === 'vertical' },
    className,
  );
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passContext: IMenuContext = {
    index: currentActive,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    // React.Children.map用于遍历children，如遇到不可遍历的children会自动跳过？
    return React.Children.map(children, (child, index) => {
      // 断言child 为 React.FunctionComponentElement
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') return React.cloneElement(childElement, { index });
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
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
