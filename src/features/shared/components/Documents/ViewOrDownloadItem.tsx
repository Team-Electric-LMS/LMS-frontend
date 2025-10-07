import { ReactElement } from "react";
import { useFetchFile } from "./hooks/useFetchFile";

interface DocumentDownloadProps {
  documentId: string;
  name: string;
  link: string;
  token: string;
}

export function DocumentViewOrDownload({
  documentId,
  name,
  link,
  token
}: DocumentDownloadProps): ReactElement {
  const {
    loading,
    blobUrl,
    showPopup,
    setShowPopup,
    handleView,
    handleDownload,
  } = useFetchFile(documentId, name, link, token);

  if (loading) return <div className="message">Loading file...</div>;

  return (
    <div className="doc-list-item">
      {name}
      <div className="icons">
      <span className="material-symbols-outlined icon" onClick={handleView}>
        open_in_full
      </span>
      <span className="material-symbols-outlined icon" onClick={handleDownload}>
        download
      </span>
      </div>

      {showPopup && blobUrl && (
        <div className="viewOverlay" onClick={() => setShowPopup(false)}>
          <div className="popUp" onClick={(e) => e.stopPropagation()}>
            <div className="popUp-title">
            <div>{name} </div>
            <span className="material-symbols-outlined icon-close"
              onClick={() => setShowPopup(false)}>close</span>
              </div>
            <iframe src={blobUrl} title={name} />
          </div>
        </div>
      )}
    </div>
  );
}
