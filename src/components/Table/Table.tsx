import React from "react";
import "./Table.scss";

type TableScrollType = "horizontal" | "vertical" | "both";

type TableRow = {
  id: number | string;
  title: string;
  date: string;
  attachment?: string | null;
  views?: number;
  ratio?: string;
  status?: string;
  category?: string;
  owner?: string;
  deadline?: string;
  note?: string;
};

const defaultWideHeaders = ["번호", "제목", "등록일", "첨부", "조회수", "경쟁률", "상태", "분류", "담당자", "마감일", "비고"];

const defaultWideRows: TableRow[] = [
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

const defaultVerticalHeaders = ["번호", "제목", "등록일"];

const defaultVerticalRows: TableRow[] = [
  { id: 1, title: "공지사항 제목 1", date: "2025-01-15" },
  { id: 2, title: "공지사항 제목 2", date: "2025-01-14" },
  { id: 3, title: "공지사항 제목 3", date: "2025-01-13" },
  { id: 4, title: "공지사항 제목 4", date: "2025-01-12" },
  { id: 5, title: "공지사항 제목 5", date: "2025-01-11" },
  { id: 6, title: "공지사항 제목 6", date: "2025-01-10" },
  { id: 7, title: "공지사항 제목 7", date: "2025-01-09" },
  { id: 8, title: "공지사항 제목 8", date: "2025-01-08" },
  { id: 9, title: "공지사항 제목 9", date: "2025-01-07" },
  { id: 10, title: "공지사항 제목 10", date: "2025-01-06" },
];

type TableProps = {
  scrollType?: TableScrollType;
  headers?: string[];
  rows?: TableRow[];
  /** 호환용: 가로/양방향 테이블의 헤더 */
  wideHeaders?: string[];
  /** 호환용: 가로/양방향 테이블의 row */
  wideRows?: TableRow[];
};

const Table = ({ 
  scrollType = "horizontal",
  headers,
  rows,
  wideHeaders,
  wideRows,
}: TableProps) => {
  const resolvedHeaders =
    headers ??
    (scrollType === "horizontal" || scrollType === "both"
      ? wideHeaders ?? defaultWideHeaders
      : defaultVerticalHeaders);

  const resolvedRows =
    rows ??
    (scrollType === "horizontal" || scrollType === "both"
      ? wideRows ?? defaultWideRows
      : defaultVerticalRows);

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
                {resolvedHeaders.map((header, idx) => (
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
              {resolvedRows.map((row) => (
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

