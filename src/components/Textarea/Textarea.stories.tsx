import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Textarea from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    autoResize: {
      control: 'boolean',
    },
    showByteCounter: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledTextarea = (args: any, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e, val) => setValue(val)}
    />
  );
};

const ByteLimitExceededWrapper = (args: any) => {
  const longText = '가'.repeat(600); // 1200바이트 (한글 2바이트)
  const [value, setValue] = useState(longText);
  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e, val) => setValue(val)}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    rows: 4,
    size: 'medium',
  },
  render: (args) => <ControlledTextarea {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '상세내용',
    placeholder: '상세 내용을 입력하세요',
    rows: 6,
    size: 'medium',
  },
  render: (args) => <ControlledTextarea {...args} />,
};

export const WithByteCounter: Story = {
  args: {
    label: '상세내용',
    placeholder: '내용을 입력하세요 (최대 1000바이트)',
    rows: 6,
    maxByte: 1000,
    showByteCounter: true,
    size: 'medium',
  },
  render: (args) => <ControlledTextarea {...args} initialValue="안녕하세요" />,
};

export const WithError: Story = {
  args: {
    label: '상세내용',
    placeholder: '내용을 입력하세요',
    value: '에러가 있는 텍스트',
    error: '필수 입력 항목입니다',
    rows: 4,
    size: 'medium',
  },
};

export const WithHelp: Story = {
  args: {
    label: '상세내용',
    placeholder: '내용을 입력하세요',
    help: '최대 500자까지 입력 가능합니다',
    rows: 4,
    size: 'medium',
  },
  render: (args) => <ControlledTextarea {...args} />,
};

export const AutoResize: Story = {
  args: {
    placeholder: '자동으로 높이가 조절됩니다',
    autoResize: true,
    size: 'medium',
  },
  render: (args) => <ControlledTextarea {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 텍스트에어리어',
    value: '비활성화된 내용',
    disabled: true,
    rows: 4,
    size: 'medium',
  },
};

export const ByteLimitExceeded: Story = {
  args: {
    label: '상세내용',
    placeholder: '내용을 입력하세요',
    rows: 6,
    maxByte: 1000,
    showByteCounter: true,
    size: 'medium',
  },
  render: (args) => <ByteLimitExceededWrapper {...args} />,
};
