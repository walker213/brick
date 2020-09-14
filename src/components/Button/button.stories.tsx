import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-named-as-default
import Button, { ButtonProps, ButtonType } from './button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    size: { control: { type: 'radio', options: ['lg', 'sm'] } },
  },
} as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// export const variousTypeButton = Template.bind({});
// variousTypeButton.args = {
//   btnType: 'primary',
//   children: 'hah',
// };

// variousTypeButton.storyName = '不同类型的Button';

const btnTypes: ButtonType[] = ['primary', 'danger', 'link', 'default'];
const bb = btnTypes.map((type) => (
  <Button key={type} btnType={type}>
    {type} button
  </Button>
));
const Template: Story<ButtonProps> = () => <>{bb}</>;
export const variousTypeButton = Template.bind({});

variousTypeButton.storyName = '不同类型的Button';

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
