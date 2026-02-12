import { ReactElement, useEffect, useState } from "react";
import { DocumentViewOrDownload } from "./ViewOrDownloadItem";
import { DocumentMeta, SelectionType } from "./types";
import { fetchDocuments } from "./api";
import "./css/styles.css";
import { ITokens } from "../../../auth/types";


interface DocumentListProps {
  level: SelectionType;
  id: string
}

export function AttachedDocumentsList({ level, id }: DocumentListProps): ReactElement {
  const [documents, setDocuments] = useState<DocumentMeta[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const raw = localStorage.getItem("tokens");
  const tokens = JSON.parse(raw!) as ITokens;
  const token = tokens.accessToken;
  

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

  if (error) return <div>{error}</div>;

  return (
    <main className="document-list">
      <ul className="doc-list-ul">
        {!documents.length && (<div>no documents available</div>)}
        {documents.map((doc) => (
          <li key={doc.id}>
            <DocumentViewOrDownload
              documentId={doc.id}
              name={doc.name}
              link={doc.link}
              token={tokens.accessToken!}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
