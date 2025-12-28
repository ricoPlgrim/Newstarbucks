import { useEffect, useRef, useState, createRef } from "react";
import Draggable from "react-draggable";
import "./DragDropList.scss";

const initialItems = [
  { id: "item-1", title: "드래그 아이템 1", desc: "리스트 첫 번째 카드" },
  { id: "item-2", title: "드래그 아이템 2", desc: "두 번째 카드" },
  { id: "item-3", title: "드래그 아이템 3", desc: "세 번째 카드" },
  { id: "item-4", title: "드래그 아이템 4", desc: "네 번째 카드" },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const DragDropList = () => {
  const [items, setItems] = useState(initialItems);
  const [dragMeta, setDragMeta] = useState({ id: null, index: -1, z: 1 });
  const listRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(80); // fallback height
  const nodeRefs = useRef({});

  // 첫 아이템 높이를 측정해 인덱스 계산 정확도 향상
  useEffect(() => {
    const first = listRef.current?.querySelector(".dnd-card");
    if (first) {
      const rect = first.getBoundingClientRect();
      // gap 10px를 포함한 예상 높이
      setItemHeight(rect.height + 10);
    }
  }, [items.length]);

  const handleStop = (itemId, startIndex) => (e, data) => {
    const deltaIndex = Math.round(data.y / itemHeight);
    const targetIndex = clamp(startIndex + deltaIndex, 0, items.length - 1);
    if (targetIndex !== startIndex) {
      const next = [...items];
      const [moved] = next.splice(startIndex, 1);
      next.splice(targetIndex, 0, moved);
      setItems(next);
    }
    setDragMeta((prev) => ({ ...prev, id: null, index: -1 }));
  };

  return (
    <div className="guide-preview guide-preview--dnd">
      <div className="dnd-header">
        <p className="dnd-help">마우스로 잡아 끌어 순서를 변경하세요.</p>
      </div>
      <div className="dnd-list" ref={listRef}>
        {items.map((item, index) => {
          if (!nodeRefs.current[item.id]) {
            nodeRefs.current[item.id] = createRef();
          }
          const nodeRef = nodeRefs.current[item.id];
          return (
            <Draggable
              key={item.id}
              axis="y"
              position={{ x: 0, y: 0 }} // 드래그 끝나면 원위치로 리셋
              onStart={() => setDragMeta((prev) => ({ id: item.id, index, z: prev.z + 1 }))}
              onStop={handleStop(item.id, index)}
              nodeRef={nodeRef}
            >
              <div
                ref={nodeRef}
                className={`dnd-card ${dragMeta.id === item.id ? "is-dragging" : ""}`}
                style={{ zIndex: dragMeta.id === item.id ? dragMeta.z : 1 }}
              >
                <div className="dnd-card__handle" aria-hidden="true">⋮⋮</div>
                <div className="dnd-card__body">
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export default DragDropList;

