import React, { useContext, FunctionComponentElement } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu');

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classnames({ [getFullClassName('active')]: index === context.index }, className);

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem')
        return React.cloneElement(childElement, { index: i });
      throw new Error('error:Menu has a child which is not a MenuItem component');
    });
    return <ul className={getFullClassName('submenu')}>{childrenComponent}</ul>;
  };
  return (
    <li className={classes}>
      <div className={getFullClassName('submenu-title')}>{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
