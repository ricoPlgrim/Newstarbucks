import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./PublishingUrlPage.scss";

const PublishingUrlPage = () => {
  // 샘플 데이터 - 실제로는 외부에서 가져올 수 있음
  const urlData = [
    {
      id: 1,
      depth1: "메인",
      depth2: "홈",
      depth3: "",
      depth4: "",
      url: "https://example.com",
      description: "메인 홈페이지"
    },
    {
      id: 2,
      depth1: "메뉴",
      depth2: "커피",
      depth3: "아메리카노",
      depth4: "",
      url: "https://example.com/menu/coffee/americano",
      description: "아메리카노 메뉴 페이지"
    },
    {
      id: 3,
      depth1: "메뉴",
      depth2: "커피",
      depth3: "라떼",
      depth4: "바닐라라떼",
      url: "https://example.com/menu/coffee/latte/vanilla-latte",
      description: "바닐라 라떼 상세 페이지"
    },
    {
      id: 4,
      depth1: "스토어",
      depth2: "매장찾기",
      depth3: "",
      depth4: "",
      url: "https://example.com/store/locator",
      description: "매장 위치 찾기"
    },
    {
      id: 5,
      depth1: "멤버십",
      depth2: "등급",
      depth3: "골드",
      depth4: "",
      url: "https://example.com/membership/tiers/gold",
      description: "골드 등급 혜택 안내"
    }
  ];

  return (
    <PageTemplate title="퍼블리싱 URL 목록">
      <div className="publishing-url-page">
        <div className="publishing-url-page__table-container">
          <table className="publishing-url-table">
            <thead>
              <tr>
                <th>뎁스1</th>
                <th>뎁스2</th>
                <th>뎁스3</th>
                <th>뎁스4</th>
                <th>URL 주소</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              {urlData.map((item) => (
                <tr key={item.id}>
                  <td>{item.depth1 || "-"}</td>
                  <td>{item.depth2 || "-"}</td>
                  <td>{item.depth3 || "-"}</td>
                  <td>{item.depth4 || "-"}</td>
                  <td>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.url}
                    </a>
                  </td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PublishingUrlPage;
