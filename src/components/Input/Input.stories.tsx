import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'number'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    showClearButton: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Hook을 사용하는 공통 컴포넌트
const ControlledInput = (args: any) => {
  const [value, setValue] = useState(args.initialValue || '');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e, val) => setValue(val)}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    value: 'invalid-email',
    error: '올바른 이메일 형식이 아닙니다',
    size: 'medium',
  },
};

export const WithSuccess: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    value: 'user@example.com',
    success: '사용 가능한 이메일입니다',
    size: 'medium',
  },
};

export const WithHelp: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    help: '8자 이상, 영문/숫자/특수문자 포함',
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const WithClearButton: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    showClearButton: true,
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} initialValue="검색어" />,
};

export const Small: Story = {
  args: {
    placeholder: 'Small Input',
    size: 'small',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const Large: Story = {
  args: {
    placeholder: 'Large Input',
    size: 'large',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Input',
    value: '비활성화된 입력',
    disabled: true,
    size: 'medium',
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const Email: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const Tel: Story = {
  args: {
    label: '전화번호',
    type: 'tel',
    placeholder: '010-1234-5678',
    size: 'medium',
  },
  render: (args) => <ControlledInput {...args} />,
};
