import React, { useEffect, useState } from "react";
import { IModule } from "../types/modules";
import { getModules, deleteModule } from "../api/modules";

interface ModuleListProps {
  courseId?: string;
  token: string;
  onEdit: (module: IModule) => void;
}

export const ModuleList: React.FC<ModuleListProps> = ({ courseId = "", token, onEdit }) => {
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setModules([]);
      return;
    }
    setLoading(true);
    getModules(courseId, token)
      .then(setModules)
      .catch((err) => {
        let msg = "Failed to fetch modules.";
        if (err instanceof Error) {
          msg += `\n${err.message}`;
        }
        if (err?.status) {
          msg += ` (Status: ${err.status})`;
        }
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [courseId, token]);
  // TODO: implement delete buttons
  // and separate this into its own component
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      await deleteModule(id, token);
      setModules(modules.filter((m) => m.id !== id));
    } catch {
      setError("Failed to delete module.");
    }
  };

  if (loading) return <div>Loading modules...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Modules</h2>
      {modules.length === 0 ? (
        <div>No modules found.</div>
      ) : (
        <ul>
          {modules.map((module) => (
            <li key={module.id}>
              <strong>{module.name}</strong>
              <button onClick={() => onEdit(module)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
