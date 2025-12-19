import { useEffect, useState } from "react";
import "./Tabs.scss";

const defaultTabItems = [
  { id: "detail", label: "상세", description: "상품 이미지, 설명, 원두 정보 등을 제공합니다." },
  { id: "review", label: "리뷰", description: "구매자 후기와 평점을 정렬/필터링하여 보여줍니다." },
  { id: "qa", label: "Q&A", description: "자주 묻는 질문과 답변을 탭 안에서 바로 확인할 수 있습니다." },
];

function Tabs({ items = defaultTabItems }) {
  const [activeTab, setActiveTab] = useState(items[0]?.id);

  useEffect(() => {
    // 새로운 데이터가 들어오면 첫 번째 탭으로 초기화
    setActiveTab(items[0]?.id);
  }, [items]);

  if (!items || items.length === 0) {
    return <div className="tabs-demo__empty">탭 데이터가 없습니다.</div>;
  }

  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <div className="tabs-demo">
      <div className="tabs-demo__tablist" role="tablist" aria-label="콘텐츠 탭 예시">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="tabs-demo__tabpanel"
        role="tabpanel"
        aria-live="polite"
        aria-label={`${activeItem?.label ?? "탭"} 탭 내용`}
      >
        {activeItem?.description ?? "내용이 없습니다."}
      </div>
    </div>
  );
}

export default Tabs;

