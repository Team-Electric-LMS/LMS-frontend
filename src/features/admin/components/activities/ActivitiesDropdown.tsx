import React, { useEffect, useState } from "react";
import { IEvent } from "./types/events";
import { getModuleActivities } from "../../api/activities";

interface ActivitiesDropdownProps {
  id: string;
  token: string;
  onSelect: (module: IEvent) => void;
}

export const ActivitiesDropdown: React.FC<ActivitiesDropdownProps> = ({
  id,
  token,
  onSelect,
}) => {
  const [activities, setActivities] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    getModuleActivities(id, token)
      .then(setActivities)
      .catch(() => setError("Failed to fetch modules."))
      .finally(() => setLoading(false));
  }, [id, token]);

  // Handle module selection
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    const activity = activities.find((c) => c.id === id);
    if (activity) onSelect(activity);
  };

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>{error}</div>;

  // Render activity selection dropdown
  return (
    <div>
      <label htmlFor="activity-select"></label>
      <select
        id="activity-select"
        value={selectedId}
        onChange={handleChange}
        disabled={activities.length === 0}
      >
        <option value="">
          {activities.length === 0
            ? "-- No activities available --"
            : "-- Choose an activity --"}
        </option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
    </div>
  );
};
