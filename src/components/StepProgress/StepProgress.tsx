import React from "react";
import "./StepProgress.scss";

type StepItem = {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
};

type StepProgressProps = {
  steps: StepItem[];
  /** 0-based 현재 단계 인덱스 */
  current: number;
  /** 활성 단계에 표시할 아이콘 (예: 브랜드 심볼) */
  currentIcon?: React.ReactNode;
  /** 라인에 잔눈금 표시 여부 */
  showTicks?: boolean;
  /** 잔눈금 개수 (steps 사이 분할용), 기본 16 */
  tickCount?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  current,
  currentIcon,
  showTicks = false,
  tickCount = 16,
  className = "",
}) => {
  const count = steps.length;
  const safeCurrent = clamp(current, 0, Math.max(0, count - 1));
  const progressPercent = count > 1 ? (safeCurrent / (count - 1)) * 100 : 100;
  const tickStyle = {
    backgroundSize: `${100 / tickCount}% 100%`,
  };

  return (
    <div className={`step-progress ${className}`}>
      <div className="step-progress__bar">
        <div className="step-progress__bar-bg">
          {showTicks && <div className="step-progress__ticks" style={tickStyle} />}
        </div>
        <div className="step-progress__bar-active" style={{ width: `${progressPercent}%` }}>
          {showTicks && <div className="step-progress__ticks step-progress__ticks--active" style={tickStyle} />}
        </div>
      </div>
      
      <div className="step-progress__steps">
        {steps.map((step, index) => {
          const status = index < safeCurrent ? "done" : index === safeCurrent ? "active" : "upcoming";
          return (
            <div className={`step-progress__step step-progress__step--${status}`} key={index}>
              <div className="step-progress__line-vertical"></div>
              <div className={`step-progress__dot ${status === "active" && currentIcon ? "step-progress__dot--icon" : ""}`}>
                {status === "active" && currentIcon ? currentIcon : null}
              </div>
              <div className="step-progress__label">
                <span className="step-progress__label-main">{step.label}</span>
                {step.subLabel && <span className="step-progress__label-sub">{step.subLabel}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;

