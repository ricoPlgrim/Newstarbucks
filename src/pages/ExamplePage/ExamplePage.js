import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./ExamplePage.scss";

const pageMatrix = [
  {
    depth1: "홈",
    depth2: "대시보드",
    depth3: "요약",
    screen: "홈 대시보드",
    id: "MBL-001",
    url: "/mobile/home",
  },
  {
    depth1: "주문",
    depth2: "메뉴 선택",
    depth3: "커스텀",
    screen: "음료 커스터마이징",
    id: "MBL-112",
    url: "/mobile/order/custom",
  },
  {
    depth1: "주문",
    depth2: "결제",
    depth3: "검수",
    screen: "결제 확인",
    id: "MBL-120",
    url: "/mobile/order/checkout",
  },
  {
    depth1: "리워드",
    depth2: "스타 적립",
    depth3: "상세",
    screen: "적립 내역",
    id: "MBL-201",
    url: "/mobile/rewards/detail",
  },
  {
    depth1: "매장",
    depth2: "주변 검색",
    depth3: "상세",
    screen: "매장 상세",
    id: "MBL-305",
    url: "/mobile/stores/detail",
  },
];

function ExamplePage() {
  return (
    <PageTemplate title="모바일 페이지 가이드">
      <section className="page-guide">
        <div className="page-guide__grid">
          <aside className="page-guide__lnb" aria-label="모바일 네비게이션">
            <p className="page-guide__lnb-label">Guide Menu</p>
            <button
              type="button"
              className="page-guide__lnb-item is-active"
              aria-current="page"
            >
              Mobile
            </button>
            <p className="page-guide__lnb-help">
              모바일 화면 구조와 URL 정보를 한 번에 확인할 수 있습니다.
            </p>
          </aside>

          <div className="page-guide__content">
            <header className="page-guide__header">
              <div>
                <p className="page-guide__eyebrow">LNB · MOBILE</p>
                <h2 className="page-guide__title">현재 페이지 가이드</h2>
              </div>
              <p className="page-guide__description">
                좌측 LNB에서 Mobile을 선택하면 우측 표에서 1~3뎁스 구조, 화면
                ID, URL까지 바로 확인할 수 있습니다.
              </p>
            </header>

            <div className="page-guide__table-wrapper" role="region" aria-label="모바일 화면 정의">
              <table className="page-guide__table">
                <thead>
                  <tr>
                    <th scope="col">1뎁스</th>
                    <th scope="col">2뎁스</th>
                    <th scope="col">3뎁스</th>
                    <th scope="col">화면</th>
                    <th scope="col">ID</th>
                    <th scope="col">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {pageMatrix.map((row) => (
                    <tr key={row.id}>
                      <td>{row.depth1}</td>
                      <td>{row.depth2}</td>
                      <td>{row.depth3}</td>
                      <td>{row.screen}</td>
                      <td>
                        <code>{row.id}</code>
                      </td>
                      <td>
                        <a href={row.url}>{row.url}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}

export default ExamplePage;

