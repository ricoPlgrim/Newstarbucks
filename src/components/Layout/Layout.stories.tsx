import type { Meta, StoryObj } from '@storybook/react';
import Container, { ContainerScale, GridSystem } from './Layout';

const meta = {
  title: 'Components/Layout',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '기본 컨테이너',
    width: 1200,
    description: '기본 컨테이너 너비입니다.',
  },
};

export const Small: Story = {
  args: {
    name: '작은 컨테이너',
    width: 600,
    description: '작은 컨테이너 너비입니다.',
  },
};

export const Large: Story = {
  args: {
    name: '큰 컨테이너',
    width: 1400,
    description: '큰 컨테이너 너비입니다.',
  },
};

export const ContainerSizes: Story = {
  render: () => (
    <ContainerScale
      title="컨테이너 크기"
      containers={[
        { name: 'Mobile', width: 375, description: '모바일 화면' },
        { name: 'Tablet', width: 768, description: '태블릿 화면' },
        { name: 'Desktop', width: 1200, description: '데스크탑 화면' },
        { name: 'Wide', width: 1400, description: '와이드 화면' },
      ]}
    />
  ),
};

export const GridSystemExample: Story = {
  render: () => (
    <GridSystem
      title="그리드 시스템"
      grids={[
        { columns: 2, gap: 16, name: '2 Columns' },
        { columns: 3, gap: 16, name: '3 Columns' },
        { columns: 4, gap: 16, name: '4 Columns' },
        { columns: 6, gap: 16, name: '6 Columns' },
      ]}
    />
  ),
};

