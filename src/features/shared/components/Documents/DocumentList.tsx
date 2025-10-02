import { ReactElement, useEffect, useState } from "react";
import { DocumentDownload } from "./DocumentDownload";
import {  DocumentMeta, SelectionType } from "./types";
import { fetchDocuments } from "./api";

interface DocumentListProps {
  level: SelectionType;
  id: string;
  token: string;
}

export function DocumentList({ level, id, token }: DocumentListProps): ReactElement {
  const [documents, setDocuments] = useState<DocumentMeta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getDocs = async () => {
      try {
        const data = await fetchDocuments(level, id, token);
        setDocuments(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching documents");
      }
    };

    getDocs();
  }, [level, id, token]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!documents.length) return <div>No documents found</div>;

  return (
    <main className="form-page">
    <ul style={{ listStyle: "none", padding: 0 }}>
      {documents.map(doc => (
        <li key={doc.id} style={{ marginBottom: "0.5rem" }}>
          <DocumentDownload documentId={doc.id} name={doc.name} link={doc.link} token={token} />
        </li>
      ))}
    </ul>
    </main>
  );
}
