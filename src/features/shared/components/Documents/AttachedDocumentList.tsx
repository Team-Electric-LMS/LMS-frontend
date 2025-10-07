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
  
  //temp solution
  const raw = localStorage.getItem("tokens");
  const tokens = JSON.parse(raw!) as ITokens;
       

  useEffect(() => {
    if (!id) return;

    const getDocs = async () => {
      try {
        const data = await fetchDocuments(level, id, tokens.accessToken!);
        setDocuments(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching documents");
      }
    };

    getDocs();
  }, [level, id, tokens.accessToken]);

  if (error) return <div>{error}</div>;

  return (
    <main className="document-list">
      <ul className="doc-list-ul">
        {!documents.length && (<div>*No documents attached</div>)}
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
