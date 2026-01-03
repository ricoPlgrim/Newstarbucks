import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import Typography from "../../components/Typography/Typography";
import { ListItem } from "../../components/List/List";
import Badge from "../../components/Badge/Badge";
import "./ProgressStatusPage.scss";

type ProgressItem = {
  id: string;
  title: string;
  store: string;
  lastModified: string;
  status: "store-request" | "partner-received" | "repair-completed";
  statusLabel: string;
};

const ProgressStatusPage = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  // 진행상태 옵션
  const statusOptions = [
    { value: "all", label: "전체" },
    { value: "store-request", label: "매장요청" },
    { value: "partner-received", label: "협력업체접수" },
    { value: "repair-completed", label: "수선완료/청구" },
  ];

  // 진행현황 데이터
  const [progressItems] = useState<ProgressItem[]>([
    {
      id: "1",
      title: "[협력업체접수] 마스트레나 2PM관련",
      store: "매장 : 종로구청",
      lastModified: "최근수정일 : 2025-12-17",
      status: "store-request",
      statusLabel: "매장요청",
    },
    {
      id: "2",
      title: "[정기세척] 아이스빈 배관, 호스(수전)누수관련",
      store: "매장 : 강남구청",
      lastModified: "최근수정일 : 2026-01-09",
      status: "partner-received",
      statusLabel: "협력업체접수",
    },
    {
      id: "3",
      title: "[장비정기점검] 레일등/직부등(LED PAR-30전구) 일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구) 일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구)",
      store: "매장 : 성동구청",
      lastModified: "최근수정일 : 2026-07-09",
      status: "repair-completed",
      statusLabel: "공사(수선)완료/금액청구",
    },
    {
      id: "4",
      title: "[수선] 에어커튼(전기누전)관련(에어커튼900)",
      store: "매장 : 강동구청",
      lastModified: "최근수정일 : 2026-04-28",
      status: "partner-received",
      statusLabel: "협력업체접수",
    },
    {
      id: "5",
      title: "[협력업체접수] 마스트레나 2PM관련",
      store: "매장 : 종로구청",
      lastModified: "최근수정일 : 2025-12-17",
      status: "store-request",
      statusLabel: "매장요청",
    },
    {
      id: "6",
      title: "[정기세척] 아이스빈 배관, 호스(수전)누수관련",
      store: "매장 : 강남구청",
      lastModified: "최근수정일 : 2026-01-09",
      status: "partner-received",
      statusLabel: "협력업체접수",
    },
    {
      id: "7",
      title: "[장비정기점검] 레일등/직부등(LED PAR-30전구) 일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구) 일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구)일등/직부등(LED PAR-30전구)",
      store: "매장 : 성동구청",
      lastModified: "최근수정일 : 2026-07-09",
      status: "repair-completed",
      statusLabel: "공사(수선)완료/금액청구",
    },
    {
      id: "8",
      title: "[수선] 에어커튼(전기누전)관련(에어커튼900)",
      store: "매장 : 강동구청",
      lastModified: "최근수정일 : 2026-04-28",
      status: "partner-received",
      statusLabel: "협력업체접수",
    },
  ]);

  //status별 count 계산
  const statusCountMap = progressItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});

  // 필터 옵션
  const filterOptions = [
    { id: "all", label: "전체",  count: progressItems.length },
    { id: "store-request", label: "매장요청", count: statusCountMap["store-request"] ?? 0 },
    { id: "partner-received", label: "협력업체접수", count: statusCountMap["partner-received"] ?? 0 },
    { id: "repair-completed", label: "수선완료/청구", count: statusCountMap["repair-completed"] ?? 0 },
  ];

  // 필터링된 아이템
  const filteredItems =
    activeFilter === "all"
      ? progressItems
      : progressItems.filter((item) => item.status === activeFilter);

  // 상태 버튼 색상 결정
  const getStatusButtonVariant = (status: ProgressItem["status"]) => {
    switch (status) {
      case "store-request":
      case "partner-received":
        return "success";
      case "repair-completed":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <CommonLayout
      customHeader={
        <Header
          variant="sub"
          categoryName="진행현황"
          onBack={() => navigate(-1)}
          showUtilities={false}
          sticky={true}
        />
      }
    >
      <div className="progress-status-page">
        {/* 진행상태 셀렉트 */}
        <div className="progress-status-page__select-section">
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            placeholder="진행상태"
            fullWidth={true}
            onChange={(opt) => {
              const next = typeof opt === "string" ? opt : opt.value;
              setActiveFilter(next);
              setSelectedStatus(next);
            }}
          />
        </div>

        {/* 필터 탭 (스크롤 모드) */}
        <div 
          id="progress-status-filter-scroll"
        >
          <Tabs
            activeTabId={activeFilter}
            type="scroll"
            scrollContainerId="progress-status-filter-scroll"
            items={filterOptions.map((f) => ({
              id: f.id,
              label: f.count !== null ? `${f.label}(${f.count})` : f.label,
            }))}
            onChange={(nextId) => {
              setActiveFilter(nextId);
              setSelectedStatus(nextId);
            }}
            showContent={false}
          />
        </div>

        {/* 진행현황 리스트 */}
        <div className="progress-status-page__list">
          {filteredItems.length === 0 ? (
            <div className="progress-status-page__empty">
              <Typography variant="body" size="medium" color="muted">
                진행현황이 없습니다.
              </Typography>
            </div>
          ) : (
            filteredItems.map((item) => (
              <ListItem
                key={item.id}
                className="progress-status-page__list-item"
                onClick={() => {
                  // 상세 페이지로 이동 (필요시 구현)
                  console.log("아이템 클릭:", item.id);
                }}
              >
                <div className="progress-status-page__item-content">
                  <Typography
                    variant="h5"
                    size="small"
                    weight="bold"
                    className="progress-status-page__item-title"
                  >
                    {item.title}
                  </Typography>

                  <div className="progress-status-page__item-info">
                    <Typography
                      variant="body"
                      size="small"
                      color="muted"
                      className="progress-status-page__item-store"
                    >
                      {item.store}
                    </Typography>

                    <div className="progress-status-page__item-meta">
                      <Typography
                        variant="body"
                        size="small"
                        color="muted"
                        className="progress-status-page__item-date"
                      >
                        {item.lastModified}
                      </Typography>
                      <Badge
                        variant={getStatusButtonVariant(item.status)}
                        size="small"
                        className="progress-status-page__status-badge"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "4px" }}
                        >
                          <path
                            d="M2 4H14V12H2V4Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 6L8 10L14 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item.statusLabel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default ProgressStatusPage;

