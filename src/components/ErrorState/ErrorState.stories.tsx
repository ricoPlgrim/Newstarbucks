import type { Meta, StoryObj } from '@storybook/react';
import ErrorState from './ErrorState';
import Button from '../Button/Button';

const meta = {
  title: 'Components/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'nodata', 'network', 'notfound'],
    },
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '오류가 발생했습니다',
    message: '잠시 후 다시 시도해주세요.',
    type: 'error',
  },
};

export const Error: Story = {
  args: {
    title: '오류가 발생했습니다',
    message: '데이터를 불러오는 중 오류가 발생했습니다.',
    type: 'error',
    icon: '⚠️',
  },
};

export const NoData: Story = {
  args: {
    title: '데이터가 없습니다',
    message: '표시할 데이터가 없습니다.',
    type: 'nodata',
    icon: '📭',
  },
};

export const Network: Story = {
  args: {
    title: '네트워크 오류',
    message: '인터넷 연결을 확인해주세요.',
    type: 'network',
    icon: '🌐',
  },
};

export const NotFound: Story = {
  args: {
    title: '페이지를 찾을 수 없습니다',
    message: '요청하신 페이지가 존재하지 않습니다.',
    type: 'notfound',
    icon: '🔍',
  },
};

export const WithAction: Story = {
  args: {
    title: '오류가 발생했습니다',
    message: '잠시 후 다시 시도해주세요.',
    type: 'error',
    icon: '⚠️',
    action: <Button variant="primary">다시 시도</Button>,
  },
};

export const CustomIcon: Story = {
  args: {
    title: '오류가 발생했습니다',
    message: '잠시 후 다시 시도해주세요.',
    type: 'error',
    icon: '❌',
  },
};

