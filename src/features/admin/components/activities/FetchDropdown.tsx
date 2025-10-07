import React, { useEffect, useState } from "react";
import { IEvent } from "./types/events";

interface FetchDropdownProps {
  id: string;
  token: string;
  fetchFunction: (id: string, token: string) => Promise<IEvent[]>;
  placeholder?: string;
  emptyMessage?: string;
  onSelect: (item: IEvent) => void;
  label?: string;
}

export const FetchDropdown: React.FC<FetchDropdownProps> = ({
  id,
  token,
  fetchFunction,
  placeholder = "-- Choose an option --",
  emptyMessage = "-- No items available --",
  onSelect,
  label,
}) => {
  const [items, setItems] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchFunction(id, token)
      .then(setItems)
      .catch(() => setError("Failed to fetch items."))
      .finally(() => setLoading(false));
  }, [id, token, fetchFunction]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    const item = items.find((c) => c.id === id);
    if (item) onSelect(item);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {label && <label>{label}</label>}
      <select
        value={selectedId}
        onChange={handleChange}
        disabled={items.length === 0}
      >
        <option value="">{items.length === 0 ? emptyMessage : placeholder}</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};