import { ReactElement, useState, FormEvent, useRef } from "react";
import {  SelectionDto } from "./types";
import { useAuthContext } from "../../../auth/hooks";
import { uploadFile } from "./api";
import { TargetDropdown } from "./helpers/targetDropdown";

interface DocumentUploadFormProps {
  legend: string;
  token: string;
}

export function DocumentUploadForm({
  legend,
  token,
}: DocumentUploadFormProps): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<SelectionDto | null>(null);
  const [success, setSuccess] = useState(false);

  const authContext = useAuthContext();
  const uploadedById = authContext?.user?.id;

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !selectedLevel)
      return alert("Please select a file and a target.");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      description && formData.append("description", description);
      uploadedById && formData.append("uploadedById", uploadedById);
      formData.append(`${selectedLevel.type}Id`, selectedLevel.id);

      await uploadFile(formData, token);

      setSuccess(true);
      setFile(null);
      setName("");
      setDescription("");
      setSelectedLevel(null);

      if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{legend}</legend>

          <label htmlFor="name">File Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{
              resize: "vertical",
              width: "100%",
              boxSizing: "border-box",
              padding: ".5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <TargetDropdown token={token} onSelect={(level) => setSelectedLevel(level)}
        />

          <label htmlFor="file">File</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
          {selectedLevel && file && (
            <p style={{ color: "green" }}>
              Ready to upload <strong>{name || "document"}</strong> to the chosen {selectedLevel.type}.
            </p>
          )}

          <button type="submit" disabled={!selectedLevel || !file || !name}>Upload</button>
          {success && (
              <p style={{ color: "green" }}>File uploaded successfully!</p>
            )}
        </fieldset>
      </form>
    </main>
  );
}
