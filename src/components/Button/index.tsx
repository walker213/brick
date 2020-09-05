import React from 'react';
import classnames from 'classnames';

function addClassPrefixHOF(prefix: string) {
  return (name?: string): string => {
    return [prefix, name].filter(Boolean).join('-');
  };
}

const acp = addClassPrefixHOF('bui-btn');

type ButtonSize = 'lg' | 'sm';
type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { type, disabled, size, href, className, children, ...restProps } = props;
  const btnClassName = classnames(
    acp(),
    acp(size),
    acp(type),
    { disabled: type === 'link' && disabled },
    className,
  );
  if (type === 'link' && href) {
    return (
      <a href={href} className={btnClassName}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={btnClassName} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  type: 'default',
};

export default Button;
