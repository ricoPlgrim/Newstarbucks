import type { Meta, StoryObj } from "@storybook/react";
import Weather from "./Weather";

const meta: Meta<typeof Weather> = {
  title: "Components/Weather",
  component: Weather,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "날씨 정보를 표시하는 컴포넌트입니다. OpenWeatherMap API를 사용하여 실시간 날씨 데이터를 가져오거나 목업 데이터를 사용할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    city: {
      control: "text",
      description: "도시 이름",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Seoul" },
      },
    },
    apiKey: {
      control: "text",
      description: "OpenWeatherMap API 키",
      table: {
        type: { summary: "string" },
      },
    },
    useMock: {
      control: "boolean",
      description: "목업 데이터 사용 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Weather>;

// 기본 스토리 (목업 데이터)
export const Default: Story = {
  args: {
    useMock: true,
  },
};

// 서울 날씨
export const Seoul: Story = {
  args: {
    city: "Seoul",
    useMock: true,
  },
};

// 부산 날씨
export const Busan: Story = {
  args: {
    city: "Busan",
    useMock: true,
  },
};

// 제주 날씨
export const Jeju: Story = {
  args: {
    city: "Jeju",
    useMock: true,
  },
};

// 실제 API 사용 예제 (주석 처리 - API 키 필요)
export const WithAPI: Story = {
  args: {
    city: "Seoul",
    apiKey: "YOUR_API_KEY",
    useMock: false,
  },
  parameters: {
    docs: {
      description: {
        story: "실제 OpenWeatherMap API를 사용하려면 유효한 API 키가 필요합니다. [OpenWeatherMap](https://openweathermap.org/api)에서 무료 API 키를 발급받을 수 있습니다.",
      },
    },
  },
};

// 여러 날씨 카드 그리드
export const Grid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", width: "100%" }}>
      <Weather city="Seoul" useMock={true} />
      <Weather city="Busan" useMock={true} />
      <Weather city="Jeju" useMock={true} />
      <Weather city="Daegu" useMock={true} />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "여러 날씨 카드를 그리드 레이아웃으로 표시하는 예제입니다.",
      },
    },
  },
};

