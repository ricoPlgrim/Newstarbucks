import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AccessibilityHelper from './AccessibilityHelper';

const meta = {
  title: 'Components/AccessibilityHelper',
  component: AccessibilityHelper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccessibilityHelper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Hook을 사용하는 컴포넌트를 별도로 정의
const DefaultWrapper = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState('normal');
  
  return (
    <div>
      <AccessibilityHelper
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        fontScale={fontScale}
        setFontScale={setFontScale}
      />
      <div style={{ padding: '40px' }}>
        <h1>접근성 도우미</h1>
        <p>우측 하단의 접근성 버튼을 클릭하여 테마와 폰트 크기를 변경할 수 있습니다.</p>
      </div>
    </div>
  );
};

const DarkModeWrapper = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontScale, setFontScale] = useState('normal');
  
  return (
    <div>
      <AccessibilityHelper
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        fontScale={fontScale}
        setFontScale={setFontScale}
      />
      <div style={{ padding: '40px' }}>
        <h1>다크 모드</h1>
        <p>다크 모드가 활성화된 상태입니다.</p>
      </div>
    </div>
  );
};

const LargeFontWrapper = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState('large');
  
  return (
    <div>
      <AccessibilityHelper
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        fontScale={fontScale}
        setFontScale={setFontScale}
      />
      <div style={{ padding: '40px' }}>
        <h1>큰 폰트</h1>
        <p>폰트 크기가 크게 설정된 상태입니다.</p>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultWrapper />,
};

export const DarkMode: Story = {
  render: () => <DarkModeWrapper />,
};

export const LargeFont: Story = {
  render: () => <LargeFontWrapper />,
};
