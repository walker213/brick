import React from 'react';
import classnames from 'classnames';
import { addClassPrefixHOF } from '../../utils';

const getFullClassName = addClassPrefixHOF('bui-btn');

type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  // className/children 出自原生接口，不用自定义
  disabled?: boolean; // button有，a没有
  href?: string; // button没有，a有
  size?: ButtonSize;
  btnType?: ButtonType; // 怎么写成type而与原生type不冲突呢？
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>; // button上的原生属性如 type
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>; // a 上的原生属性如 target
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // 将所有属性全部设置为可选（因为a和button上的必需属性不相同）

// 这里的export是为配合 react-docgen-typescript 使用
export const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, href, className, children, ...restProps } = props;
  const classes = classnames(
    getFullClassName(),
    getFullClassName(btnType),
    {
      [getFullClassName(size)]: size,
      [getFullClassName('link-disabled')]: btnType === 'link' && disabled,
    },
    className,
  );
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
