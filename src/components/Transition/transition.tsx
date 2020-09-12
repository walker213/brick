import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

interface TransitionProps {
  animation?: AnimationName;
  wrapper?: boolean; // 包一层空div并把动画效果加到上面以防止 与children本身的transition发生冲突
}

const Transition: React.FC<TransitionProps & CSSTransitionProps> = (props) => {
  const { animation, wrapper, classNames = animation, children, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
