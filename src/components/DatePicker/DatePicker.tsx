import { useEffect, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ko } from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import Button from "../Button/Button";
import "./DatePicker.scss";

type DatePickerType = "date" | "time" | "range";

interface DatePickerProps {
  type?: DatePickerType;
  value?: Date | DateRange;
  onChange?: (date: Date | DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

function formatDate(date: Date | undefined) {
  if (!date) return "날짜를 선택해주세요.";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatTime(date: Date | undefined) {
  if (!date) return "시간을 선택해주세요.";
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatDateTime(date: Date | undefined) {
  if (!date) return "날짜와 시간을 선택해주세요.";
  return `${formatDate(date)} ${formatTime(date)}`;
}

function formatRange(range: DateRange | undefined) {
  if (!range?.from && !range?.to) return "날짜를 선택해주세요.";
  const from = range?.from ? formatDate(range.from) : "";
  const to = range?.to ? formatDate(range.to) : "";
  if (!from && !to) return "날짜를 선택해주세요.";
  if (!from) return `${to}까지`;
  if (!to) return `${from}부터`;
  return `${from} ~ ${to}`;
}

function DatePicker({ type = "date", value, onChange, placeholder, className }: DatePickerProps) {
  const [openSingle, setOpenSingle] = useState(false);
  const [openRange, setOpenRange] = useState(false);
  const [openMulti, setOpenMulti] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const [selected, setSelected] = useState<Date | undefined>(() => {
    if (type === "date" && value instanceof Date) return value;
    return undefined;
  });
  const [range, setRange] = useState<DateRange | undefined>(() => {
    if (type === "range" && value && typeof value === "object" && "from" in value) {
      return value as DateRange;
    }
    return undefined;
  });
  const [multiRange, setMultiRange] = useState<DateRange | undefined>();
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(() => {
    if (type === "time" && value instanceof Date) return value;
    return undefined;
  });
  const [selectedHour, setSelectedHour] = useState<number | null>(() => {
    if (type === "time" && value instanceof Date) return value.getHours();
    return null;
  });
  const [selectedMinute, setSelectedMinute] = useState<number | null>(() => {
    if (type === "time" && value instanceof Date) return value.getMinutes();
    return null;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timePickerRef = useRef<HTMLDivElement | null>(null);
  const rangePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (type === "date" && value instanceof Date) {
      setSelected(value);
    } else if (type === "time" && value instanceof Date) {
      setSelectedTime(value);
      setSelectedHour(value.getHours());
      setSelectedMinute(value.getMinutes());
    } else if (type === "range" && value && typeof value === "object" && "from" in value) {
      setRange(value as DateRange);
    }
  }, [value, type]);

  useEffect(() => {
    if (!openSingle && !openRange && !openMulti && !openTime) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenSingle(false);
        setOpenMulti(false);
      }
      if (timePickerRef.current && !timePickerRef.current.contains(e.target as Node)) {
        setOpenTime(false);
      }
      if (rangePickerRef.current && !rangePickerRef.current.contains(e.target as Node)) {
        setOpenRange(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openSingle, openRange, openMulti, openTime]);

  const handleTimeSelect = (hour: number, minute: number) => {
    const newTime = new Date();
    newTime.setHours(hour);
    newTime.setMinutes(minute);
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);
    setSelectedTime(newTime);
    setSelectedHour(hour);
    setSelectedMinute(minute);
    onChange?.(newTime);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);
    onChange?.(date);
  };

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    onChange?.(selectedRange);
  };

  const getDisplayValue = () => {
    if (type === "date") return formatDate(selected);
    if (type === "time") return formatTime(selectedTime);
    if (type === "range") return formatRange(range);
    return placeholder || "날짜를 선택해주세요.";
  };

  const getIcon = () => {
    if (type === "date") return "📅";
    if (type === "time") return "🕐";
    if (type === "range") return "📅";
    return "📅";
  };

  // 단일 타입 컴포넌트 렌더링
  if (type === "date" || type === "time" || type === "range") {
    return (
      <div className={`date-picker date-picker--${type} ${className || ""}`} ref={type === "time" ? timePickerRef : type === "range" ? rangePickerRef : containerRef}>
        <div className="date-picker__group">
          <div className="date-picker__input" onClick={() => {
            if (type === "date") setOpenSingle((v) => !v);
            if (type === "time") setOpenTime((v) => !v);
            if (type === "range") setOpenRange((v) => !v);
          }}>
            <span>{getDisplayValue()}</span>
            <span className="date-picker__icon">{getIcon()}</span>
          </div>
          
          {type === "date" && openSingle && (
            <div className="date-picker__popover" role="dialog" aria-modal="true">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={(day) => {
                  handleDateSelect(day);
                  setOpenSingle(false);
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

          {type === "time" && openTime && (
            <div className="date-picker__popover date-picker__popover--time" role="dialog" aria-modal="true">
              <div className="date-picker__time-section">
                <p className="date-picker__section-title">시간</p>
                <div className="date-picker__time-grid">
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      className={`date-picker__time-btn ${selectedHour === hour ? "is-selected" : ""}`}
                      onClick={() => handleTimeSelect(hour, selectedMinute || 0)}
                    >
                      {hour < 12 ? `오전 ${hour === 0 ? 12 : hour}시` : `오후 ${hour === 12 ? 12 : hour - 12}시`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="date-picker__time-section">
                <p className="date-picker__section-title">분</p>
                <div className="date-picker__time-minutes">
                  {[0, 15, 30, 45].map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      className={`date-picker__time-btn ${selectedMinute === minute ? "is-selected" : ""}`}
                      onClick={() => handleTimeSelect(selectedHour || 0, minute)}
                    >
                      {minute}분
                    </button>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setOpenTime(false)}
                className="date-picker__close"
              >
                닫기
              </Button>
            </div>
          )}

          {type === "range" && openRange && (
            <div className="date-picker__popover" role="dialog" aria-modal="true">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={(dayRange) => {
                  handleRangeSelect(dayRange ?? undefined);
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
      </div>
    );
  }

  // 기존 데모 모드 (타입이 없을 때)
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
