import { ReactElement, useState, useEffect, FormEvent } from "react";
import { Activity, Course, Module, SelectionDto, SelectionType } from "./types";
import { useAuthContext } from "../../../auth/hooks";
import { getCoursesExtended, uploadFile } from "./api";

interface DocumentUploadFormProps {
  token: string;
}

export function DocumentUploadForm({ token }: DocumentUploadFormProps): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<SelectionDto | null>(null);
  const [treeData, setTreeData] = useState<Course[]>([]);

  const authContext = useAuthContext();
  const uploadedById = authContext?.user?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesExtended(token);
        setTreeData(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !selectedLevel) return alert("Please select a file and a target.");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      description && formData.append("description", description);
      uploadedById && formData.append("uploadedById", uploadedById);
      formData.append(`${selectedLevel.type}Id`, selectedLevel.id);

      await uploadFile(formData, token);

      alert("File uploaded successfully!");
      setFile(null);
      setName("");
      setDescription("");
      setSelectedLevel(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Recursive renderOptions
  const renderOptions = (courses: Course[], depth = 1): ReactElement[] => {
    return courses.flatMap(course => {
      const courseOption: ReactElement = (
        <option key={`course-${course.id}`} value={course.id} data-type="course">
          {`${"-".repeat(depth)} ${course.name}`}
        </option>
      );

      const moduleOptions: ReactElement[] = course.modules.flatMap((m: Module) => {
        const modOption: ReactElement = (
          <option key={`module-${m.id}`} value={m.id} data-type="module">
            {`${"-".repeat(depth + 1)} ${m.name}`}
          </option>
        );

        const activityOptions: ReactElement[] = m.activities.map((a: Activity) => (
          <option key={`activity-${a.id}`} value={a.id} data-type="activity">
            {`${"-".repeat(depth + 2)} ${a.name}`}
          </option>
        ));

        return [modOption, ...activityOptions];
      });

      return [courseOption, ...moduleOptions];
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opt = e.target.selectedOptions[0];
    setSelectedLevel({ id: opt.value, type: opt.getAttribute("data-type") as SelectionType });
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Upload Document</legend>

          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required />

          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
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

          <label>Target</label>
          <select
            value={selectedLevel?.id || ""}
            onChange={handleSelectChange}
            required
            className="select-input"
          >
            <option value="">-- Select Course / Module / Activity --</option>
            {renderOptions(treeData)}
          </select>

          <label>File</label>
          <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} required />

          <button type="submit">Upload</button>
        </fieldset>
      </form>
    </main>
  );
}
