import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '도움말',
    text: '툴팁 내용입니다.',
    placement: 'top',
  },
};

export const Top: Story = {
  args: {
    label: '도움말',
    text: '위쪽에 표시되는 툴팁입니다.',
    placement: 'top',
  },
};

export const Bottom: Story = {
  args: {
    label: '도움말',
    text: '아래쪽에 표시되는 툴팁입니다.',
    placement: 'bottom',
  },
};

export const Left: Story = {
  args: {
    label: '도움말',
    text: '왼쪽에 표시되는 툴팁입니다.',
    placement: 'left',
  },
};

export const Right: Story = {
  args: {
    label: '도움말',
    text: '오른쪽에 표시되는 툴팁입니다.',
    placement: 'right',
  },
};

export const LongText: Story = {
  args: {
    label: '도움말',
    text: '이것은 매우 긴 툴팁 텍스트입니다. 여러 줄로 표시될 수 있으며, 사용자에게 상세한 정보를 제공합니다.',
    placement: 'top',
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', padding: '60px' }}>
      <Tooltip label="위쪽" text="위쪽 툴팁" placement="top" />
      <div style={{ display: 'flex', gap: '40px' }}>
        <Tooltip label="왼쪽" text="왼쪽 툴팁" placement="left" />
        <Tooltip label="오른쪽" text="오른쪽 툴팁" placement="right" />
      </div>
      <Tooltip label="아래쪽" text="아래쪽 툴팁" placement="bottom" />
    </div>
  ),
};

