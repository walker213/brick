import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu');

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: number) => void;
export interface MenuProps {
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
    { [getFullClassName('verticla')]: mode === 'vertical' },
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
  return (
    <ul className={classes} style={style} {...restProps}>
      <MenuContext.Provider value={passContext}>{children}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
