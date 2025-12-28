import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toast from './Toast';
import Button from '../Button/Button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoWrapper = (args: any) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setMessage(args.message || '')}>Info Toast 표시</Button>
      {message && (
        <Toast
          {...args}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
};

const SuccessWrapper = (args: any) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setMessage(args.message || '')}>Success Toast 표시</Button>
      {message && (
        <Toast
          {...args}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
};

const WarningWrapper = (args: any) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setMessage(args.message || '')}>Warning Toast 표시</Button>
      {message && (
        <Toast
          {...args}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
};

const ErrorWrapper = (args: any) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setMessage(args.message || '')}>Error Toast 표시</Button>
      {message && (
        <Toast
          {...args}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
};

const LongDurationWrapper = (args: any) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setMessage(args.message || '')}>Long Duration Toast 표시</Button>
      {message && (
        <Toast
          {...args}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
};

const AllTypesWrapper = () => {
  const [messages, setMessages] = useState<{ type: string; message: string }[]>([]);
  
  const showToast = (type: string, message: string) => {
    setMessages([...messages, { type, message }]);
    setTimeout(() => {
      setMessages((prev) => prev.slice(1));
    }, 3000);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button onClick={() => showToast('info', 'Info 메시지')}>Info</Button>
      <Button onClick={() => showToast('success', 'Success 메시지')}>Success</Button>
      <Button onClick={() => showToast('warning', 'Warning 메시지')}>Warning</Button>
      <Button onClick={() => showToast('error', 'Error 메시지')}>Error</Button>
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
        {messages.map((msg, idx) => (
          <Toast
            key={idx}
            message={msg.message}
            type={msg.type as 'info' | 'success' | 'warning' | 'error'}
            onClose={() => setMessages((prev) => prev.filter((_, i) => i !== idx))}
          />
        ))}
      </div>
    </div>
  );
};

export const Info: Story = {
  args: {
    message: '정보 메시지입니다.',
    type: 'info',
    duration: 3000,
  },
  render: (args) => <InfoWrapper {...args} />,
};

export const Success: Story = {
  args: {
    message: '성공 메시지입니다.',
    type: 'success',
    duration: 3000,
  },
  render: (args) => <SuccessWrapper {...args} />,
};

export const Warning: Story = {
  args: {
    message: '경고 메시지입니다.',
    type: 'warning',
    duration: 3000,
  },
  render: (args) => <WarningWrapper {...args} />,
};

export const Error: Story = {
  args: {
    message: '에러 메시지입니다.',
    type: 'error',
    duration: 3000,
  },
  render: (args) => <ErrorWrapper {...args} />,
};

export const LongDuration: Story = {
  args: {
    message: '5초 동안 표시되는 토스트입니다.',
    type: 'info',
    duration: 5000,
  },
  render: (args) => <LongDurationWrapper {...args} />,
};

export const AllTypes: Story = {
  render: () => <AllTypesWrapper />,
};
