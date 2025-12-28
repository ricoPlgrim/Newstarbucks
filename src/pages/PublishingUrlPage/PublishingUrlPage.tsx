import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Loading from "../../components/Loading/Loading";
import "./PublishingUrlPage.scss";
import { fetchMockUrls } from "../../mocks/mockData";

const PublishingUrlPage = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMockUrls();
        setUrls(data);
      } catch (err) {
        console.error("URL 데이터 로드 실패:", err);
        setError("데이터 로드에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

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
              {isLoading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <Loading size={48} label="데이터를 불러오는 중..." />
                    </div>
                  </td>
                </tr>
              )}
              {error && !isLoading && (
                <tr>
                  <td colSpan={6}>{error}</td>
                </tr>
              )}
              {!isLoading && !error && urls.map((item) => {
                const isLocalPage = item.url.startsWith('/');
                
                return (
                  <tr key={item.id}>
                    <td>{item.depth1 || "-"}</td>
                    <td>{item.depth2 || "-"}</td>
                    <td>{item.depth3 || "-"}</td>
                    <td>{item.depth4 || "-"}</td>
                    <td>
                      {isLocalPage ? (
                        <Link
                          to={item.url}
                          style={{ cursor: 'pointer', color: 'var(--color-accent)' }}
                        >
                          {item.url} 
                        </Link>
                      ) : (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.url}
                        </a>
                      )}
                    </td>
                    <td>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PublishingUrlPage;
