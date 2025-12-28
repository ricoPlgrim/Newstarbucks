import { useState, useEffect } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import SearchField from "../../components/SearchField/SearchField";
import List, { ListItem } from "../../components/List/List";
import Typography from "../../components/Typography/Typography";
import Icon from "../../components/Icon/Icon";
import EmptyState from "../../components/EmptyState/EmptyState";
import type { ChangeEvent, MouseEvent } from "react";
import "./SearchSamplePage.scss";

type SearchResult = {
  id: number;
  title: string;
  description: string;
};

const SearchSamplePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // 연관검색어 샘플 데이터 (실제로는 검색어에 따라 동적으로 생성)
  const getRelatedSearches = (query: string): string[] => {
    if (!query.trim()) return [];
    // 샘플 연관검색어 (실제로는 API에서 가져옴)
    return [
      `${query} 추천`,
      `${query} 리뷰`,
      `${query} 가격`,
      `${query} 비교`,
      `${query} 후기`,
    ];
  };

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed);
        }
      } catch (error) {
        console.error("Failed to parse recent searches:", error);
      }
    }
  }, []);

  // 최근 검색어 저장
  const saveRecentSearch = (keyword: string): void => {
    if (!keyword.trim()) return;

    const updated = [keyword, ...recentSearches.filter((item) => item !== keyword)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (_e: ChangeEvent<HTMLInputElement>, value: string): void => {
    setSearchValue(value);
    setIsSearchMode(value.length > 0);
  };

  // 검색 실행 핸들러
  const handleSearch = (value: string): void => {
    if (!value.trim()) return;

    saveRecentSearch(value);
    setHasSearched(true);
    setIsSearchMode(true);
    
    // 실제 검색 로직 실행 (현재는 빈 결과로 시뮬레이션)
    // 실제로는 API 호출: const results = await fetchSearchResults(value);
    console.log("검색 실행:", value);
    
    // 샘플: 검색 결과가 없는 것으로 설정 (실제로는 API 응답에 따라 설정)
    setSearchResults([]);
    // navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  // 검색어 클리어 핸들러
  const handleClear = (): void => {
    setSearchValue("");
    setIsSearchMode(false);
    setSearchResults([]);
    setHasSearched(false);
  };

  // 개별 검색어 삭제 핸들러
  const handleDeleteSearch = (keyword: string): void => {
    const updated = recentSearches.filter((item) => item !== keyword);
    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  // 전체 검색어 삭제 핸들러
  const handleDeleteAll = (): void => {
    setRecentSearches([]);
    localStorage.removeItem("recent-searches");
  };

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = (keyword: string): void => {
    setSearchValue(keyword);
    handleSearch(keyword);
  };

  return (
    <PageTemplate>
      <div className="search-sample-page">
        {/* 검색 헤더 */}
        <div className="search-sample-page__header">
          <div className="search-sample-page__search-wrapper">
            <SearchField
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              onClear={handleClear}
              showClearButton={true}
              size="medium"
              variant="default"
              className="search-sample-page__search-field"
            />
          </div>
        </div>

        {/* 최근 검색어 섹션 */}
        {!isSearchMode && recentSearches.length > 0 && (
          <div className="search-sample-page__recent">
            <div className="search-sample-page__recent-header">
              <Typography variant="h3" size="medium" className="search-sample-page__recent-title">
                최근 검색어
              </Typography>
              <button
                className="search-sample-page__delete-all"
                onClick={handleDeleteAll}
                type="button"
              >
                전체 삭제
              </button>
            </div>

            <List className="search-sample-page__recent-list">
              {recentSearches.map((keyword, index) => (
                <ListItem
                  key={`${keyword}-${index}`}
                  onClick={() => handleRecentSearchClick(keyword)}
                  className="search-sample-page__recent-item"
                >
                  <span className="search-sample-page__recent-text">{keyword}</span>
                  <Icon
                    name="삭제"
                    size="small"
                    clickable={true}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleDeleteSearch(keyword);
                    }}
                    className="search-sample-page__delete-icon"
                  >
                    ×
                  </Icon>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {/* 검색 결과 영역 (검색 모드일 때) */}
        {isSearchMode && (
          <>
            {hasSearched && searchResults.length === 0 ? (
              <div className="search-sample-page__no-results">
                <EmptyState
                  title="검색 결과가 없습니다"
                  description={`"${searchValue}"에 대한 검색 결과를 찾을 수 없습니다.`}
                  icon="🔍"
                  variant="default"
                />
              </div>
            ) : hasSearched && searchResults.length > 0 ? (
              <div className="search-sample-page__results">
                <Typography variant="h4" size="small" className="search-sample-page__results-title">
                  검색 결과 ({searchResults.length}개)
                </Typography>
                <List className="search-sample-page__results-list">
                  {searchResults.map((result) => (
                    <ListItem key={result.id} className="search-sample-page__result-item">
                      <Typography variant="h5" size="small">{result.title}</Typography>
                      <Typography variant="body" size="small" color="muted">
                        {result.description}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </div>
            ) : (
              <div className="search-sample-page__results">
                <Typography variant="body" size="medium" className="search-sample-page__results-text">
                  "{searchValue}" 검색 결과가 여기에 표시됩니다.
                </Typography>
              </div>
            )}

            {/* 연관검색어 섹션 */}
            {hasSearched && (
              <div className="search-sample-page__related">
                <Typography variant="h4" size="small" className="search-sample-page__related-title">
                  연관검색어
                </Typography>
                <List className="search-sample-page__related-list">
                  {getRelatedSearches(searchValue).map((relatedSearch, index) => (
                    <ListItem
                      key={index}
                      onClick={() => {
                        setSearchValue(relatedSearch);
                        handleSearch(relatedSearch);
                      }}
                      className="search-sample-page__related-item"
                    >
                      <span className="search-sample-page__related-icon"></span>
                      {relatedSearch}
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
          </>
        )}

        {/* 빈 상태 (검색어 없고 최근 검색어도 없을 때) */}
        {!isSearchMode && recentSearches.length === 0 && (
          <div className="search-sample-page__empty">
            <Typography variant="body" size="medium" className="search-sample-page__empty-text">
              최근 검색어가 없습니다.
            </Typography>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default SearchSamplePage;

