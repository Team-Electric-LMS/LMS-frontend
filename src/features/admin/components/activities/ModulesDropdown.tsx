import React, { useEffect, useState } from "react";
import { IEvent } from "./types/events";
import { getModules } from "../../api/modules";


interface ModuleDropdownProps {
  id: string;
  token: string;
  onSelect: (module: IEvent) => void;
}

export const ModulesDropdown: React.FC<ModuleDropdownProps> = ({ id, token, onSelect }) => {
  const [modules, setModules] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");


  useEffect(() => {
    setLoading(true);
    getModules(id, token)
      .then(setModules)
      .catch(() => setError("Failed to fetch modules."))
      .finally(() => setLoading(false));
  }, [id, token]);

  // Handle module selection
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    const module = modules.find((c) => c.id === id);
    if (module) onSelect(module);
  };

  if (loading) return <div>Loading modules...</div>;
  if (error) return <div>{error}</div>;

  // Render module selection dropdown
  return (
    <div>
      <label htmlFor="course-select"></label>
      <select id="course-select" value={selectedId} onChange={handleChange} disabled={modules.length === 0}>
        <option value="">
          {modules.length === 0
            ? "-- No modules available --"
            : "-- Choose an module --"}
        </option>
        {modules.map((module) => (
          <option key={module.id} value={module.id}>
            {module.name}
          </option>
        ))}
      </select>
    </div>
  );
};