import React from "react";
import "./Table.scss";

const defaultWideHeaders = ["번호", "제목", "등록일", "첨부", "조회수", "경쟁률", "상태", "분류", "담당자", "마감일", "비고"];

const defaultWideRows = [
  {
    id: 1,
    title: "데이터 분석가 채용",
    date: "2025-01-07",
    attachment: "jd.pdf",
    views: 3210,
    ratio: "15:1",
    status: "진행중",
    category: "채용",
    owner: "홍길동",
    deadline: "2025-02-01",
    note: "온라인 면접",
  },
  {
    id: 2,
    title: "프론트엔드 인턴 모집",
    date: "2025-01-15",
    attachment: "apply.docx",
    views: 1880,
    ratio: "22:1",
    status: "접수중",
    category: "인턴",
    owner: "김개발",
    deadline: "2025-02-10",
    note: "리액트 과제 포함",
  },
  {
    id: 3,
    title: "디자인 시스템 워크숍",
    date: "2025-01-20",
    attachment: null,
    views: 940,
    ratio: "4:1",
    status: "마감임박",
    category: "교육",
    owner: "이기획",
    deadline: "2025-01-30",
    note: "오프라인",
  },
];

const defaultVerticalHeaders = ["번호", "제목", "등록일", "조회수", "상태"];

const defaultVerticalRows = [
  { id: 1, title: "공지사항 제목 1", date: "2025-01-15", views: 1250, status: "공개" },
  { id: 2, title: "공지사항 제목 2", date: "2025-01-14", views: 980, status: "공개" },
  { id: 3, title: "공지사항 제목 3", date: "2025-01-13", views: 750, status: "공개" },
  { id: 4, title: "공지사항 제목 4", date: "2025-01-12", views: 620, status: "공개" },
  { id: 5, title: "공지사항 제목 5", date: "2025-01-11", views: 540, status: "공개" },
  { id: 6, title: "공지사항 제목 6", date: "2025-01-10", views: 430, status: "공개" },
  { id: 7, title: "공지사항 제목 7", date: "2025-01-09", views: 380, status: "공개" },
  { id: 8, title: "공지사항 제목 8", date: "2025-01-08", views: 320, status: "공개" },
  { id: 9, title: "공지사항 제목 9", date: "2025-01-07", views: 290, status: "공개" },
  { id: 10, title: "공지사항 제목 10", date: "2025-01-06", views: 250, status: "공개" },
];

const Table = ({ 
  scrollType = "horizontal", // "horizontal" | "vertical" | "both"
  headers = scrollType === "horizontal" || scrollType === "both" ? defaultWideHeaders : defaultVerticalHeaders,
  rows = scrollType === "horizontal" || scrollType === "both" ? defaultWideRows : defaultVerticalRows
}) => {
  const isHorizontal = scrollType === "horizontal";
  const isVertical = scrollType === "vertical";
  const isBoth = scrollType === "both";

  return (
    <div className="guide-preview guide-preview--table">
      <section className="table">
        <header className="table__header">
          {isHorizontal && (
            <>
              <h4>가로 스크롤 · 열 고정 테이블</h4>
              <p className="table__desc">첫 열을 고정해 좌우 스크롤 시 주요 식별 정보를 유지합니다.</p>
            </>
          )}
          {isVertical && (
            <>
              <h4>세로 스크롤 · 헤더 고정 테이블</h4>
              <p className="table__desc">세로 스크롤 시 헤더가 상단에 고정되어 항상 표시됩니다.</p>
            </>
          )}
          {isBoth && (
            <>
              <h4>가로·세로 스크롤 · 헤더 & 열 고정 테이블</h4>
              <p className="table__desc">세로 스크롤 시 헤더가 고정되고, 가로 스크롤 시 첫 열이 고정됩니다.</p>
            </>
          )}
        </header>
        <div 
          className={`table__table-wrapper ${
            isHorizontal 
              ? "table__table-wrapper--scroll-horizontal table__table-wrapper--freeze" 
              : isVertical
              ? "table__table-wrapper--scroll-vertical"
              : "table__table-wrapper--scroll-both table__table-wrapper--freeze"
          }`}
        >
          <table 
            className={`table__table ${
              isHorizontal 
                ? "table__table--wide table__table--freeze" 
                : isVertical
                ? "table__table--vertical"
                : "table__table--wide table__table--freeze"
            }`}
          >
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={header}
                    scope="col"
                    className={
                      isHorizontal || isBoth
                        ? (idx === 0 ? "is-sticky is-sticky--first" : "" )
                        : ""
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {isHorizontal ? (
                    <>
                      <td className="is-sticky is-sticky--first">{row.id}</td>
                      <td>{row.title}</td>
                      <td>{row.date}</td>
                      <td>{row.attachment ?? "없음"}</td>
                      <td>{row.views?.toLocaleString()}</td>
                      <td>{row.ratio}</td>
                      <td>{row.status}</td>
                      <td>{row.category}</td>
                      <td>{row.owner}</td>
                      <td>{row.deadline}</td>
                      <td>{row.note}</td>
                    </>
                  ) : isVertical ? (
                    <>
                      <td>{row.id}</td>
                      <td className="table__title">{row.title}</td>
                      <td>{row.date}</td>
                      <td>{row.views?.toLocaleString()}</td>
                      <td>{row.status}</td>
                    </>
                  ) : (
                    <>
                      <td className="is-sticky is-sticky--first">{row.id}</td>
                      <td>{row.title}</td>
                      <td>{row.date}</td>
                      <td>{row.attachment ?? "없음"}</td>
                      <td>{row.views?.toLocaleString()}</td>
                      <td>{row.ratio}</td>
                      <td>{row.status}</td>
                      <td>{row.category}</td>
                      <td>{row.owner}</td>
                      <td>{row.deadline}</td>
                      <td>{row.note}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Table;

