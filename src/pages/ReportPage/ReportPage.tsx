import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import FileUpload from "../../components/FileUpload/FileUpload";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import Checkbox from "../../components/Checkbox/Checkbox";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./ReportPage.scss";

type EmergencyMeasure = "대피" | "소방 출동";
type Store = "건대스타시티" | "건대입구" | "건국클래식";
type Location = "플로어" | "백룸" | "창가" | "천장" | "DT영업점";
type BusinessStatus = "영업가능" | "일시 영업중단" | "DT 영업중단";
type DamageType = "파트너" | "고객" | "물품" | "기타";

const ReportPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emergencyMeasures: [] as EmergencyMeasure[],
    store: "" as Store | "",
    occurrenceDate: null as Date | null,
    occurrenceTime: null as Date | null,
    locations: [] as Location[],
    businessStatus: [] as BusinessStatus[],
    damageTypes: [] as DamageType[],
    details: "",
    urgentReport: false,
    connectMaintenance: false,
  });


  const handleEmergencyMeasureToggle = (measure: EmergencyMeasure) => {
    setFormData((prev) => ({
      ...prev,
      emergencyMeasures: prev.emergencyMeasures.includes(measure)
        ? prev.emergencyMeasures.filter((m) => m !== measure)
        : [...prev.emergencyMeasures, measure],
    }));
  };

  const handleStoreSelect = (store: Store) => {
    setFormData((prev) => ({
      ...prev,
      store: prev.store === store ? "" : store,
    }));
  };

  const handleLocationToggle = (location: Location) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }));
  };

  const handleBusinessStatusToggle = (status: BusinessStatus) => {
    setFormData((prev) => ({
      ...prev,
      businessStatus: prev.businessStatus.includes(status)
        ? prev.businessStatus.filter((s) => s !== status)
        : [...prev.businessStatus, status],
    }));
  };

  const handleDamageTypeToggle = (type: DamageType) => {
    setFormData((prev) => ({
      ...prev,
      damageTypes: prev.damageTypes.includes(type)
        ? prev.damageTypes.filter((t) => t !== type)
        : [...prev.damageTypes, type],
    }));
  };

  const handleDetailsChange = (_e: ChangeEvent<HTMLTextAreaElement>, value: string) => {
    setFormData((prev) => ({
      ...prev,
      details: value,
    }));
  };

  const handleUrgentReportChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      urgentReport: e.target.checked,
    }));
  };

  const handleConnectMaintenanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      connectMaintenance: e.target.checked,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("보고 제출:", formData);
    // 실제 제출 로직은 여기에 구현
    // navigate("/report-preview", { state: formData });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "오후" : "오전";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours}시 ${minutes.toString().padStart(2, "0")}분`;
  };

  // 바이트 수 계산 함수 (Textarea 컴포넌트와 동일한 로직)
  const getByteLength = (str: string): number => {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (char.match(/[가-힣ㄱ-ㅎㅏ-ㅣ一-龯]/)) {
        byteLength += 2;
      } else {
        byteLength += 1;
      }
    }
    return byteLength;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      occurrenceDate: date || null,
    }));
  };

  const handleTimeSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      occurrenceTime: date || null,
    }));
  };

  return (
    <CommonLayout
      headerVariant="sub"
      headerCategoryName="보고작성"
      headerOnBack={() => navigate(-1)}
      headerOnCartClick={() => {}}
      headerOnUtilityClick={() => {}}
      headerShowUtilities={false}
      headerSticky={true}
    >
      <div className="report-page">

      <form className="report-page__form" onSubmit={handleSubmit}>
        {/* 카테고리 */}
        <div className="report-page__section">
          <div className="report-page__category">
            <div className="report-page__category-icon">🏠</div>
            <div className="report-page__category-text">
              <Typography variant="body" size="medium" className="report-page__category-label">
                보고하기
              </Typography>
              <Typography variant="body" size="small" color="muted">
                재해시설 &gt; 누수
              </Typography>
            </div>
          </div>
        </div>

        {/* 사진 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            사진
          </Typography>
          <FileUpload />
        </div>

        {/* 응급조치 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            응급조치
          </Typography>
          <div className="report-page__button-group">
            {(["대피", "소방 출동"] as EmergencyMeasure[]).map((measure) => (
              <Button
                key={measure}
                type="button"
                variant={formData.emergencyMeasures.includes(measure) ? "primary" : "ghost"}
                size="medium"
                onClick={() => handleEmergencyMeasureToggle(measure)}
                className="report-page__select-btn"
              >
                {measure}
              </Button>
            ))}
          </div>
        </div>

        {/* 발생매장 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            발생매장
          </Typography>
          <div className="report-page__button-group">
            {(["건대스타시티", "건대입구", "건국클래식"] as Store[]).map((store) => (
              <Button
                key={store}
                type="button"
                variant={formData.store === store ? "primary" : "ghost"}
                size="medium"
                onClick={() => handleStoreSelect(store)}
                className="report-page__select-btn"
              >
                {store}
              </Button>
            ))}
          </div>
        </div>

        {/* 발생시간 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            발생시간
          </Typography>
          <div className="report-page__time-group">
            <DatePicker
              type="date"
              value={formData.occurrenceDate || undefined}
              onChange={handleDateSelect}
              placeholder="날짜를 선택해주세요"
              className="report-page__date-picker"
            />
            <DatePicker
              type="time"
              value={formData.occurrenceTime || undefined}
              onChange={handleTimeSelect}
              placeholder="시간을 선택해주세요"
              className="report-page__time-picker"
            />
          </div>
        </div>

        {/* 발생장소 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            발생장소
          </Typography>
          <div className="report-page__button-group">
            {(["플로어", "백룸", "창가", "천장", "DT영업점"] as Location[]).map((location) => (
              <Button
                key={location}
                type="button"
                variant={formData.locations.includes(location) ? "primary" : "ghost"}
                size="medium"
                onClick={() => handleLocationToggle(location)}
                className="report-page__select-btn"
              >
                {location}
              </Button>
            ))}
          </div>
        </div>

        {/* 영업가부 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            영업가부
          </Typography>
          <div className="report-page__button-group">
            {(["영업가능", "일시 영업중단", "DT 영업중단"] as BusinessStatus[]).map((status) => (
              <Button
                key={status}
                type="button"
                variant={formData.businessStatus.includes(status) ? "primary" : "ghost"}
                size="medium"
                onClick={() => handleBusinessStatusToggle(status)}
                className="report-page__select-btn"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* 재난피해 */}
        <div className="report-page__section">
          <Typography variant="h4" size="small" className="report-page__label">
            재난피해
          </Typography>
          <div className="report-page__button-group">
            {(["파트너", "고객", "물품", "기타"] as DamageType[]).map((type) => (
              <Button
                key={type}
                type="button"
                variant={formData.damageTypes.includes(type) ? "primary" : "ghost"}
                size="medium"
                onClick={() => handleDamageTypeToggle(type)}
                className="report-page__select-btn"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </form>

      {/* 보고내용 미리보기 */}
      <div className="report-page__preview">
        <div className="report-page__preview-header">
          <Typography variant="h3" size="medium" className="report-page__preview-title">
            보고내용 미리보기
          </Typography>
          <Typography variant="body" size="small" color="muted" className="report-page__preview-subtitle">
            선택하신 항목이 자동 입력됩니다
          </Typography>
        </div>
        <div className="report-page__preview-content">
          <div className="report-page__preview-row">
            <Typography variant="body" size="small" className="report-page__preview-label">
              응급조치
            </Typography>
            <div className="report-page__preview-value">
              {formData.emergencyMeasures.length > 0 ? (
                <div className="report-page__preview-buttons">
                  {formData.emergencyMeasures.map((measure) => (
                    <span key={measure} className="report-page__preview-badge">
                      {measure}
                    </span>
                  ))}
                </div>
              ) : (
                <Typography variant="body" size="small" color="muted">-</Typography>
              )}
            </div>
          </div>

          <div className="report-page__preview-row">
            <Typography variant="body" size="small" className="report-page__preview-label">
              발생매장
            </Typography>
            <div className="report-page__preview-value">
              <Typography variant="body" size="small">
                {formData.store || "-"}
              </Typography>
            </div>
          </div>

          <div className="report-page__preview-row">
            <Typography variant="body" size="small" className="report-page__preview-label">
              발생시간
            </Typography>
            <div className="report-page__preview-value">
              <Typography variant="body" size="small">
                {formData.occurrenceDate && formData.occurrenceTime
                  ? `${formatDate(formData.occurrenceDate)} ${formatTime(formData.occurrenceTime)}`
                  : formData.occurrenceDate
                  ? formatDate(formData.occurrenceDate)
                  : "-"}
              </Typography>
            </div>
          </div>

          <div className="report-page__preview-row">
            <Typography variant="body" size="small" className="report-page__preview-label">
              발생장소
            </Typography>
            <div className="report-page__preview-value">
              {formData.locations.length > 0 ? (
                <Typography variant="body" size="small">
                  {formData.locations.join(", ")}
                </Typography>
              ) : (
                <Typography variant="body" size="small" color="muted">-</Typography>
              )}
            </div>
          </div>

          <div className="report-page__preview-row">
            <Typography variant="body" size="small" className="report-page__preview-label">
              영업가부
            </Typography>
            <div className="report-page__preview-value">
              {formData.businessStatus.length > 0 ? (
                <Typography variant="body" size="small">
                  {formData.businessStatus.join(", ")}
                </Typography>
              ) : (
                <Typography variant="body" size="small" color="muted">-</Typography>
              )}
            </div>
          </div>

          <div className="report-page__preview-row">
            <Typography variant="body" size="small" className="report-page__preview-label">
              재난피해
            </Typography>
            <div className="report-page__preview-value">
              {formData.damageTypes.length > 0 ? (
                <Typography variant="body" size="small">
                  {formData.damageTypes.join(", ")}
                </Typography>
              ) : (
                <Typography variant="body" size="small" color="muted">-</Typography>
              )}
            </div>
          </div>

          <div className="report-page__preview-row report-page__preview-row--full">
            <Typography variant="body" size="small" className="report-page__preview-label">
              상세내용
            </Typography>
            <div className="report-page__preview-value">
              <Textarea
                placeholder="보다 자세한 상황 파악을 위해 상세내용을 입력해 주세요."
                value={formData.details}
                onChange={handleDetailsChange}
                rows={6}
                maxByte={1000}
                showByteCounter={true}
                className="report-page__preview-textarea-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 체크박스 및 제출 버튼 */}
      <div className="report-page__footer">
        <div className="report-page__checkboxes">
          <Checkbox
            label="긴급 보고 필요"
            checked={formData.urgentReport}
            onChange={handleUrgentReportChange}
          />
          <Checkbox
            label="유지보수 앱 연결하기"
            checked={formData.connectMaintenance}
            onChange={handleConnectMaintenanceChange}
          />
        </div>
        <Button 
          type="button" 
          variant="primary" 
          size="large" 
          className="report-page__submit-btn"
          onClick={(e) => {
            e.preventDefault();
            const form = document.querySelector('.report-page__form') as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
        >
          보고하기
        </Button>
      </div>
      </div>
    </CommonLayout>
  );
};

export default ReportPage;

