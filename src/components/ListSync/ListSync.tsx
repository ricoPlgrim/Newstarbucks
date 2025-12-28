import { useState } from "react";
import "./ListSync.scss";

const defaultOptions = [
  { value: "서울", label: "서울" },
  { value: "부산", label: "부산" },
  { value: "대구", label: "대구" },
  { value: "광주", label: "광주" },
  { value: "제주", label: "제주" },
];

function ListSync({ options = defaultOptions, onChange }) {
  const [items, setItems] = useState([]);

  const handleAdd = (option) => {
    // 중복 방지: value 기준으로 이미 있으면 추가하지 않음
    if (items.some((item) => item.value === option.value)) return;
    const next = [...items, option];
    setItems(next);
    onChange?.(next);
  };

  const handleRemove = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange?.(next);
  };

  return (
    <div className="list-sync">
      <div className="list-sync__source" aria-label="추가할 항목 선택">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="list-sync__option"
            onClick={() => handleAdd(option)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="list-sync__target">
        <div className="list-sync__target-head">
          <span>선택된 항목</span>
          <span className="list-sync__count">{items.length}개</span>
        </div>
        {items.length === 0 ? (
          <p className="list-sync__empty">아직 선택된 항목이 없습니다.</p>
        ) : (
          <ul className="list-sync__list">
            {items.map((item, idx) => (
              <li key={`${item.value}-${idx}`}>
                <span>{item.label}</span>
                <button
                  type="button"
                  className="list-sync__remove"
                  onClick={() => handleRemove(idx)}
                  aria-label={`${item.label} 삭제`}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListSync;

