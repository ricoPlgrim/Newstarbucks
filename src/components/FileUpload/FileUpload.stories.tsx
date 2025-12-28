import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from './FileUpload';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithContainer: Story = {
  render: () => (
    <div style={{ width: '600px', padding: '20px' }}>
      <FileUpload />
    </div>
  ),
};

