import React, { useContext, FunctionComponentElement, useState } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-menu-submenu');

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubmenu = context.defaultOpenSubMenus as string[];
  const isOpen = index && context.mode === 'vertical' ? openedSubmenu.includes(index) : false;
  const [menuOpen, setmenuOpen] = useState(isOpen);
  const classes = classnames(
    getFullClassName(),
    { [getFullClassName('active')]: index === context.currentActiveIndex, 'menu-opened': menuOpen },
    className,
  );

  const handleClick = (e: React.MouseEvent) => {
    if (context.mode === 'horizontal') return;
    e.preventDefault();
    setmenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, isIn: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setmenuOpen(isIn);
    }, 300);
  };
  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classnames(getFullClassName('list'));
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem')
        return React.cloneElement(childElement, { index: `${index}-${i.toString()}` });
      throw new Error('error:Menu has a child which is not a MenuItem component');
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li className={classes} {...hoverEvents}>
      <div className={getFullClassName('title')} onClick={handleClick}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
