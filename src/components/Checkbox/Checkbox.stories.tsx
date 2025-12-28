import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Hook을 사용하는 컴포넌트를 별도로 정의
const DefaultWrapper = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const CheckedWrapper = (args: any) => {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const GroupWrapper = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox
        label="옵션 1"
        checked={checked1}
        onChange={(e) => setChecked1(e.target.checked)}
      />
      <Checkbox
        label="옵션 2"
        checked={checked2}
        onChange={(e) => setChecked2(e.target.checked)}
      />
      <Checkbox
        label="옵션 3"
        checked={checked3}
        onChange={(e) => setChecked3(e.target.checked)}
      />
    </div>
  );
};

const WithNameWrapper = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    label: '체크박스',
    checked: false,
  },
  render: (args) => <DefaultWrapper {...args} />,
};

export const Checked: Story = {
  args: {
    label: '체크된 체크박스',
    checked: true,
  },
  render: (args) => <CheckedWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 체크박스',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '비활성화된 체크된 체크박스',
    checked: true,
    disabled: true,
  },
};

export const Group: Story = {
  render: () => <GroupWrapper />,
};

export const WithName: Story = {
  args: {
    label: '동의합니다',
    name: 'agreement',
    value: 'agree',
    checked: false,
  },
  render: (args) => <WithNameWrapper {...args} />,
};
