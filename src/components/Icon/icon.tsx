import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-icon');

// github.com/FortAwesome/react-fontawesome
// Build a Library to Reference Icons Throughout Your App More Conveniently
library.add(fas); // 一次性加入所有图标，可以通过字符串引用

export type ThemeProps =
  | 'primary'
  | 'scondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = classnames(getFullClassName(), theme && getFullClassName(theme), className);
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
