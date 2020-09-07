import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './index';

describe('test Button component', () => {
  const text = 'kobe';
  it('should render the correct default button', () => {
    const fn = jest.fn();
    const wrapper = render(<Button onClick={fn}>{text}</Button>);
    const element = wrapper.getByText(text) as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('BUTTON');
    expect(element).toHaveClass('bui-btn bui-btn-default');
    expect(element.disabled).toBeFalsy();
    // 在element上模擬點擊事件
    fireEvent.click(element);
    expect(fn).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    const testProps: ButtonProps = {
      btnType: 'primary',
      size: 'lg',
      className: 'custom',
    };
    const wrapper = render(<Button {...testProps}>{text}</Button>);
    const element = wrapper.getByText(text);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('bui-btn-primary bui-btn-lg custom');
  });
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="http://stupid">
        {text}
      </Button>,
    );
    const element = wrapper.getByText(text);
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('A');
    expect(element).toHaveClass('bui-btn-link');
  });
  it('should render disabled button when disabled set to true', () => {
    const fn = jest.fn();
    const wrapper = render(
      <Button disabled onClick={fn}>
        {text}
      </Button>,
    );
    const element = wrapper.getByText(text) as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(fn).not.toHaveBeenCalled();
  });
});
