import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  render: () => (
    <div className="max-w-xs flex flex-col gap-3">
      <Input/>
      <Input disabled />
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="max-w-xs flex flex-col gap-3">
      <Input size="large" />
      <Input size="large" disabled />
    </div>
  ),
};
