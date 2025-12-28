import type { Meta, StoryObj } from '@storybook/react';
import DragDropList from './DragDropList';

const meta = {
  title: 'Components/DragDropList',
  component: DragDropList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DragDropList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

