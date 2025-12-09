import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragDropList.scss";

const initialItems = [
  { id: "item-1", title: "드래그 아이템 1", desc: "리스트 첫 번째 카드" },
  { id: "item-2", title: "드래그 아이템 2", desc: "두 번째 카드" },
  { id: "item-3", title: "드래그 아이템 3", desc: "세 번째 카드" },
  { id: "item-4", title: "드래그 아이템 4", desc: "네 번째 카드" },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DragDropList = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    setItems((prev) => reorder(prev, source.index, destination.index));
  };

  return (
    <div className="guide-preview guide-preview--dnd">
      <div className="dnd-header">
        <p className="dnd-help">마우스로 잡아 끌어 순서를 변경하세요.</p>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list" isDropDisabled={false} isCombineEnabled={false}>
          {(provided) => (
            <div className="dnd-list" ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={false}>
                  {(dragProvided, snapshot) => (
                    <div
                      className={`dnd-card ${snapshot.isDragging ? "is-dragging" : ""}`}
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <div className="dnd-card__handle" aria-hidden="true">⋮⋮</div>
                      <div className="dnd-card__body">
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragDropList;

