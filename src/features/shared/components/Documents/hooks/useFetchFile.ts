import { useState } from "react";
import { downloadDocument } from "../api";

export function useFetchFile(documentId: string, name: string, link: string, token: string) {

  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const getFileName = () => {
    const extMatch = link.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    return extMatch ? `${name}.${extMatch[1]}` : name;
  };

  const fetchBlob = async () => {
    if (blobUrl) return blobUrl;
    setLoading(true);
    try {
      const blob = await downloadDocument(documentId, token);
      const url = window.URL.createObjectURL(blob);
      setBlobUrl(url);
      return url;
    } catch (err) {
      console.error(err);
      alert("Failed to fetch document");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    const url = await fetchBlob();
    if (url) setShowPopup(true);
  };

  const handleDownload = async () => {
    const url = await fetchBlob();
    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.download = getFileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return {
    loading,
    blobUrl,
    showPopup,
    setShowPopup,
    getFileName,
    fetchBlob,
    handleView,
    handleDownload,
  };
}