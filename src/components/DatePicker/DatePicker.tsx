import { useEffect, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ko } from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import Button from "../Button/Button";
import "./DatePicker.scss";

function formatDate(date) {
  if (!date) return "날짜를 선택하세요";
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatRange(range: DateRange | undefined) {
  if (!range?.from && !range?.to) return "날짜를 선택하세요";
  const from = range?.from ? formatDate(range.from) : "";
  const to = range?.to ? formatDate(range.to) : "";
  return `${from} ~ ${to}`;
}

function DatePicker() {
  const [openSingle, setOpenSingle] = useState(false);
  const [openRange, setOpenRange] = useState(false);
  const [openMulti, setOpenMulti] = useState(false);

  const [selected, setSelected] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [multiRange, setMultiRange] = useState<DateRange | undefined>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openSingle && !openRange && !openMulti) return;
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenSingle(false);
        setOpenRange(false);
        setOpenMulti(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openSingle, openRange, openMulti]);

  return (
    <div className="date-picker" ref={containerRef}>
      <div className="date-picker__group">
        <p className="date-picker__group-title">싱글 선택</p>
        <div className="date-picker__input" onClick={() => setOpenSingle((v) => !v)}>
          <span>{formatDate(selected)}</span>
          <span className="date-picker__icon">📅</span>
        </div>
        {openSingle && (
          <div className="date-picker__popover" role="dialog" aria-modal="true">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(day) => {
                setSelected(day);
              }}
              weekStartsOn={0}
              locale={ko}
              showOutsideDays
              fixedWeeks
            />
            <Button
              variant="ghost"
              size="small"
              onClick={() => setOpenSingle(false)}
              className="date-picker__close"
            >
              닫기
            </Button>
          </div>
        )}
      </div>

      <div className="date-picker__group">
        <p className="date-picker__group-title">기간 선택</p>
        <div className="date-picker__input" onClick={() => setOpenRange((v) => !v)}>
          <span>{formatRange(range)}</span>
          <span className="date-picker__icon">📅</span>
        </div>
        {openRange && (
          <div className="date-picker__popover" role="dialog" aria-modal="true">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={(dayRange) => {
                setRange(dayRange ?? undefined);
              }}
              weekStartsOn={0}
              locale={ko}
              showOutsideDays
              fixedWeeks
            />
            <Button
              variant="ghost"
              size="small"
              onClick={() => setOpenRange(false)}
              className="date-picker__close"
            >
              닫기
            </Button>
          </div>
        )}
      </div>

      <div className="date-picker__group">
        <p className="date-picker__group-title">2개월 범위 선택 (멀티 캘린더)</p>
        <div className="date-picker__input" onClick={() => setOpenMulti((v) => !v)}>
          <span>{formatRange(multiRange)}</span>
          <span className="date-picker__icon">📅</span>
        </div>
        {openMulti && (
          <div className="date-picker__popover" role="dialog" aria-modal="true">
            <DayPicker
              mode="range"
              selected={multiRange}
              onSelect={(dayRange) => {
                setMultiRange(dayRange ?? undefined);
              }}
              numberOfMonths={2}
              pagedNavigation
              weekStartsOn={0}
              locale={ko}
              showOutsideDays
              fixedWeeks
            />
            <Button
              variant="ghost"
              size="small"
              onClick={() => setOpenMulti(false)}
              className="date-picker__close"
            >
              닫기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePicker;

