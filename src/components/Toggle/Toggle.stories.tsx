import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toggle from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOn: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultWrapper = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle
      {...args}
      defaultOn={checked}
      onChange={(val) => {
        setChecked(val);
        console.log('Toggle changed:', val);
      }}
    />
  );
};

const OnWrapper = (args: any) => {
  const [checked, setChecked] = useState(true);
  return (
    <Toggle
      {...args}
      defaultOn={checked}
      onChange={(val) => {
        setChecked(val);
        console.log('Toggle changed:', val);
      }}
    />
  );
};

const WithDescriptionWrapper = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle
      {...args}
      defaultOn={checked}
      onChange={(val) => {
        setChecked(val);
        console.log('Toggle changed:', val);
      }}
    />
  );
};

const GroupWrapper = () => {
  const [push, setPush] = useState(false);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toggle
        label="푸시 알림"
        description="앱 푸시 알림을 받습니다"
        defaultOn={push}
        onChange={setPush}
      />
      <Toggle
        label="이메일 알림"
        description="이메일로 알림을 받습니다"
        defaultOn={email}
        onChange={setEmail}
      />
      <Toggle
        label="SMS 알림"
        description="문자 메시지로 알림을 받습니다"
        defaultOn={sms}
        onChange={setSms}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    label: '알림 받기',
    defaultOn: false,
  },
  render: (args) => <DefaultWrapper {...args} />,
};

export const On: Story = {
  args: {
    label: '알림 받기',
    defaultOn: true,
  },
  render: (args) => <OnWrapper {...args} />,
};

export const WithDescription: Story = {
  args: {
    label: '푸시 알림',
    description: '새로운 메시지와 업데이트를 받습니다',
    defaultOn: false,
  },
  render: (args) => <WithDescriptionWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 토글',
    defaultOn: false,
    disabled: true,
  },
};

export const DisabledOn: Story = {
  args: {
    label: '비활성화된 토글 (켜짐)',
    defaultOn: true,
    disabled: true,
  },
};

export const Group: Story = {
  render: () => <GroupWrapper />,
};
