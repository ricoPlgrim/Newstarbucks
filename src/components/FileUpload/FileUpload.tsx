import { useState, useRef } from "react";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import "./FileUpload.scss";

const MAX_SIZE = 300 * 1024 * 1024; // 300MB

type UploadedFile = {
  id: number;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string;
};

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
];

const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"];

const isImage = (file: File): boolean => {
  // MIME 타입 확인
  const isValidMimeType = file.type.startsWith("image/") && ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase());
  
  // 파일 확장자 확인 (MIME 타입이 없거나 잘못된 경우 대비)
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_IMAGE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  
  // .ico 파일 명시적으로 제외
  if (fileName.endsWith(".ico")) {
    return false;
  }
  
  return isValidMimeType || hasValidExtension;
};

const formatSize = (bytes: number) => {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
};

function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 파일 선택 변경 이벤트 핸들러
   * 파일 input의 onChange 이벤트에서 호출됨
   * @param {Event} event - input change 이벤트 객체
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 선택된 파일들을 배열로 변환
    const selectedFiles = Array.from(event.target.files || []) as File[];
    if (selectedFiles.length === 0) return;

    // 이미지 파일만 필터링 (image/* 타입만 허용)
    const imageFiles = selectedFiles.filter(isImage);

    // 이미지 파일이 없으면 경고 후 종료
    if (imageFiles.length === 0) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      event.target.value = ""; // input 초기화
      return;
    }


    // 파일 크기 체크 (각 파일이 MAX_SIZE(300MB)를 초과하는지 확인)
    const oversizedFiles = imageFiles.filter((file) => file.size > MAX_SIZE);
    if (oversizedFiles.length > 0) {
      alert("최대 300MB까지 첨부할 수 있습니다.");
      event.target.value = ""; // input 초기화
      return;
    }

    // 미리보기 URL 생성 (Blob URL을 생성하여 이미지 미리보기용으로 사용)
    const newFiles: UploadedFile[] = imageFiles.map((file) => ({
      id: Date.now() + Math.floor(Math.random() * 1_000_000), // 고유 ID 생성
      file, // 원본 File 객체
      name: file.name, // 파일명
      size: file.size, // 파일 크기
      type: file.type, // MIME 타입
      preview: URL.createObjectURL(file), // Blob URL 생성 (미리보기용)
    }));

    // 로딩 상태 추가 (이미지 로드 완료 전까지 로딩 표시)
    const newFileIds = newFiles.map((f) => f.id);
    setLoadingFiles((prev) => {
      const newSet = new Set(prev);
      newFileIds.forEach((id) => newSet.add(id)); // 새 파일들의 ID를 로딩 Set에 추가
      return newSet;
    });

    // 파일 목록에 새 파일들 추가
    setFiles((prev) => [...prev, ...newFiles]);
    event.target.value = ""; // input 초기화 (같은 파일 다시 선택 가능하도록)
  };

  /**
   * 개별 파일 삭제 이벤트 핸들러
   * 삭제 버튼 클릭 시 호출됨
   * @param {string|number} id - 삭제할 파일의 고유 ID
   */
  const handleRemove = (id) => {
    setFiles((prev) => {
      // 삭제할 파일 찾기
      const fileToRemove = prev.find((f) => f.id === id);
      // Blob URL 메모리 해제 (메모리 누수 방지)
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      // 해당 ID를 가진 파일 제외하고 반환
      return prev.filter((f) => f.id !== id);
    });
    // 로딩 상태에서도 제거
    setLoadingFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  /**
   * 이미지 로드 완료 이벤트 핸들러
   * Image 컴포넌트의 onLoad 이벤트에서 호출됨
   * @param {string|number} id - 로드 완료된 파일의 고유 ID
   */
  const handleImageLoad = (id) => {
    // 로딩 상태에서 제거 (이미지 로드 완료)
    setLoadingFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  /**
   * 이미지 로드 실패 이벤트 핸들러
   * Image 컴포넌트의 onError 이벤트에서 호출됨
   * @param {string|number} id - 로드 실패한 파일의 고유 ID
   */
  const handleImageError = (id) => {
    // 로딩 상태에서 제거 (에러 발생 시에도 로딩 표시 제거)
    setLoadingFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  /**
   * 모든 파일 삭제 이벤트 핸들러
   * "전체 삭제" 버튼 클릭 시 호출됨
   */
  const handleClearAll = () => {
    // 모든 파일의 Blob URL 메모리 해제
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    // 파일 목록 초기화
    setFiles([]);
    // 로딩 상태 초기화
    setLoadingFiles(new Set());
    // input 초기화
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="file-upload-demo">
      <div className="file-upload-demo__container">
        {/* 업로드된 이미지 목록 */}
        {files.length > 0 && (
          <div className="file-upload-demo__preview-list">
            {files.map((file) => {
              const isLoading = loadingFiles.has(file.id);
              return (
                <div key={file.id} className="file-upload-demo__preview-item">
                  <div className="file-upload-demo__preview-image-wrapper">
                    {isLoading && (
                      <div className="file-upload-demo__preview-loading">
                        <Loading size={32} thickness={3} label="" />
                      </div>
                    )}
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="file-upload-demo__preview-image"
                      onLoad={() => handleImageLoad(file.id)}
                      onError={() => handleImageError(file.id)}
                    />
                    <button
                      type="button"
                      className="file-upload-demo__preview-remove"
                      onClick={() => handleRemove(file.id)}
                      aria-label={`${file.name} 삭제`}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 추가 업로드 버튼 */}
            <label className="file-upload-demo__upload-area file-upload-demo__upload-area--small" htmlFor="component-file-input">
              <input
                ref={inputRef}
                id="component-file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="file-upload-demo__input"
              />
              <div className="file-upload-demo__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 카메라 본체 */}
                  <rect x="8" y="14" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                  {/* 렌즈 */}
                  <circle cx="24" cy="26" r="6" stroke="currentColor" strokeWidth="2"/>
                  {/* 플러스 기호 */}
                  <path d="M32 10L32 6M30 8L34 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </label>
          </div>
        )}

        {/* 파일이 없을 때 업로드 영역 */}
        {files.length === 0 && (
          <label className="file-upload-demo__upload-area" htmlFor="component-file-input">
            <input
              ref={inputRef}
              id="component-file-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="file-upload-demo__input"
            />
            <div className="file-upload-demo__icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 카메라 본체 */}
                <rect x="8" y="14" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                {/* 렌즈 */}
                <circle cx="24" cy="26" r="6" stroke="currentColor" strokeWidth="2"/>
                {/* 플러스 기호 */}
                <path d="M32 10L32 6M30 8L34 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
