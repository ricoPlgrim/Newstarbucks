import React from "react";
import "./TableDemo.scss";

const basicRows = [
  { id: 1, title: "모집 공고 A", date: "2025-01-03", attachment: "guide.pdf", views: 1280, ratio: "12:1" },
  { id: 2, title: "모집 공고 B", date: "2025-01-12", attachment: null, views: 860, ratio: "9:1" },
  { id: 3, title: "모집 공고 C", date: "2025-02-02", attachment: "terms.docx", views: 432, ratio: "5:1" },
  { id: 4, title: "모집 공고 D", date: "2025-02-14", attachment: "spec.xlsx", views: 2210, ratio: "18:1" },
  { id: 5, title: "모집 공고 E", date: "2025-03-01", attachment: null, views: 642, ratio: "7:1" },
];

const wideHeaders = ["번호", "제목", "등록일", "첨부", "조회수", "경쟁률", "상태", "분류", "담당자", "마감일", "비고"];

const wideRows = [
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

const TableDemo = () => {
  return (
    <div className="guide-preview guide-preview--table">
      <section className="table-demo">
        <header className="table-demo__header">
          <h4>기본 테이블</h4>
          <p className="table-demo__desc">번호, 제목, 등록일, 첨부, 조회수, 경쟁률 컬럼을 가진 기본형 표입니다.</p>
        </header>
        <div className="table-demo__table-wrapper table-demo__table-wrapper--scroll">
          <table className="table-demo__table">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">등록일</th>
                <th scope="col">첨부</th>
                <th scope="col">조회수</th>
                <th scope="col">경쟁률</th>
              </tr>
            </thead>
            <tbody>
              {basicRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className="table-demo__title">{row.title}</td>
                  <td>{row.date}</td>
                  <td>{row.attachment ? row.attachment : "없음"}</td>
                  <td>{row.views.toLocaleString()}</td>
                  <td>{row.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="table-demo">
        <header className="table-demo__header">
          <h4>가로 스크롤 테이블</h4>
          <p className="table-demo__desc">열이 많을 때를 대비해 가로 스크롤을 제공하는 테이블입니다.</p>
        </header>
        <div className="table-demo__table-wrapper table-demo__table-wrapper--scroll">
          <table className="table-demo__table table-demo__table--wide">
            <thead>
              <tr>
                {wideHeaders.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wideRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className="table-demo__title">{row.title}</td>
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

