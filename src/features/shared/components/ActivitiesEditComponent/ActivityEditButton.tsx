import { ReactElement, useState } from "react";
import { IEvent } from "./types/events";
import { ActivityEditForm } from "./ActivityEditForm";
import './css/styles.css';


interface EditActivityProps {
  activity: IEvent;
  onUpdate?: (updated: IEvent) => void;
}

export function EditActivity({ activity, onUpdate }: EditActivityProps): ReactElement {

  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (updatedActivity: IEvent) => {
    setIsOpen(false);
    if (onUpdate) onUpdate(updatedActivity);
  };

  return (
    <div style={{ display: "inline-block" }} onClick={() => setIsOpen(true)}>

    <span className="material-symbols-outlined"> edit </span>
      
      {isOpen && (
        <div className="editOverlay">
          <div className="popUp" onClick={(e) => e.stopPropagation()}
          >
            <ActivityEditForm
              legend = "Edit Activity" 
              eventObj={activity}
              onClose={() => setIsOpen(false)}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}