import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Radio from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultWrapper = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const CheckedWrapper = (args: any) => {
  const [checked, setChecked] = useState(true);
  return (
    <Radio
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const GroupWrapper = () => {
  const [selected, setSelected] = useState('option2');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio
        label="옵션 1"
        name="radio-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={() => setSelected('option1')}
      />
      <Radio
        label="옵션 2"
        name="radio-group"
        value="option2"
        checked={selected === 'option2'}
        onChange={() => setSelected('option2')}
      />
      <Radio
        label="옵션 3"
        name="radio-group"
        value="option3"
        checked={selected === 'option3'}
        onChange={() => setSelected('option3')}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    label: '라디오 버튼',
    name: 'radio-group',
    value: 'option1',
    checked: false,
  },
  render: (args) => <DefaultWrapper {...args} />,
};

export const Checked: Story = {
  args: {
    label: '선택된 라디오 버튼',
    name: 'radio-group',
    value: 'option1',
    checked: true,
  },
  render: (args) => <CheckedWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 라디오 버튼',
    name: 'radio-group',
    value: 'option1',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '비활성화된 선택된 라디오 버튼',
    name: 'radio-group',
    value: 'option1',
    checked: true,
    disabled: true,
  },
};

export const Group: Story = {
  render: () => <GroupWrapper />,
};
