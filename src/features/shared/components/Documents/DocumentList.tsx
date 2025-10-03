import { ReactElement, useEffect, useState } from "react";
import { DocumentDownload } from "./DocumentDownloadItem";
import { DocumentMeta, SelectionType } from "./types";
import { fetchDocuments } from "./api";
import { useAdminContext } from "../../../admin/context";
import "./css/styles.css";


interface DocumentListProps {
  level: SelectionType;
  id: string
}

export function DocumentList({ level, id }: DocumentListProps): ReactElement {
  const [documents, setDocuments] = useState<DocumentMeta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAdminContext();

  useEffect(() => {
    if (!id) return;

    const getDocs = async () => {
      try {
        const data = await fetchDocuments(level, id, token!);
        setDocuments(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching documents");
      }
    };

    getDocs();
  }, [level, id, token]);

  if (error) return <div>{error}</div>;

  return (
    <main className="document-list">
      <ul className="doc-list-ul">
        {!documents.length &&  (<div>No documents found</div>)}
        {documents.map((doc) => (
          <li key={doc.id}>
            <DocumentDownload
              documentId={doc.id}
              name={doc.name}
              link={doc.link}
              token={token!}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
