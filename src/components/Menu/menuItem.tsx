import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu-item');

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, style, className, children, ...restProps } = props;
  const context = useContext(MenuContext);
  const classes = classnames(
    getFullClassName(),
    { disabled, [getFullClassName('active')]: index === context.index },
    className,
  );
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick} {...restProps}>
      {children}
    </li>
  );
};

export default MenuItem;
