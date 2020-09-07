import React from 'react';
import classnames from 'classnames';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu');

type MenuMode = 'vertical' | 'horizontal';
export interface MenuProps {
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
  className?: string;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, mode, style, onSelect, className, children, ...restProps } = props;
  const classes = classnames(
    getFullClassName(),
    { [getFullClassName('verticla')]: mode === 'vertical' },
    className,
  );
  return (
    <ul className={classes} style={style} {...restProps}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
