import React from "react";
import "./TableDemo.scss";

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

const TableDemo = ({ wideHeaders = defaultWideHeaders, wideRows = defaultWideRows }) => {
  return (
    <div className="guide-preview guide-preview--table">
      <section className="table-demo">
        <header className="table-demo__header">
          <h4>가로 스크롤 · 열 고정 테이블</h4>
          <p className="table-demo__desc">첫 두 열을 고정해 좌우 스크롤 시 주요 식별 정보를 유지합니다.</p>
        </header>
        <div className="table-demo__table-wrapper table-demo__table-wrapper--scroll table-demo__table-wrapper--freeze">
          <table className="table-demo__table table-demo__table--wide table-demo__table--freeze">
            <thead>
              <tr>
                {wideHeaders.map((header, idx) => (
                  <th
                    key={header}
                    scope="col"
                    className={idx === 0 ? "is-sticky is-sticky--first" : idx === 1 ? "is-sticky is-sticky--second" : ""}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wideRows.map((row) => (
                <tr key={row.id}>
                  <td className="is-sticky is-sticky--first">{row.id}</td>
                  <td className="table-demo__title is-sticky is-sticky--second">{row.title}</td>
                  <td>{row.date}</td>
                  <td>{row.attachment ?? "없음"}</td>
                  <td>{row.views.toLocaleString()}</td>
                  <td>{row.ratio}</td>
                  <td>{row.status}</td>
                  <td>{row.category}</td>
                  <td>{row.owner}</td>
                  <td>{row.deadline}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TableDemo;

