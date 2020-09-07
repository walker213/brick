import React from 'react';
import classnames from 'classnames';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu-item');

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, style, className, children, ...restProps } = props;
  const classes = classnames(getFullClassName(), { disabled }, className);
  return (
    <li className={classes} style={style} {...restProps}>
      {children}
    </li>
  );
};

export default MenuItem;
