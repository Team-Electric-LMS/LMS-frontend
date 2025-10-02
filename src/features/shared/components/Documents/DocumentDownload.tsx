import { ReactElement, useState } from "react";
import { downloadDocument } from "./api";
import { useDownload } from "./hooks/useDownload";

interface DocumentDownloadProps {
  documentId: string;
  name: string;
  link: string;
  token: string;
}

export function DocumentDownload({ documentId, name, link, token }: DocumentDownloadProps): ReactElement {
  const [loading, setLoading] = useState(false);
   const { downloadFile } = useDownload();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await downloadDocument(documentId, token);

      const extMatch = link.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
      const fileName = extMatch ? `${name}.${extMatch[1]}` : name;
      
      downloadFile(blob, fileName);
    } catch (err) {
      console.error(err);
      alert("Failed to download document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="download-button"
      style={{
        width: "200px",        
        textAlign: "left",     
        padding: "0.5rem 1rem",
        border: "1px solid #007bff",
        borderRadius: "4px",
        background: "none",
        color: "#007bff",
        cursor: loading ? "not-allowed" : "pointer"
      }}
    >
      {loading ? "Downloading..." : `${name} ⬇️`}
    </button>
  );
}
