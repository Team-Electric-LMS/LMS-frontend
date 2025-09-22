import { ReactElement, useState } from 'react';
import { useLoaderData } from "react-router";
import { Registration } from '../../auth/components';

interface ClaimsResponse {
  id: string;
  email: string;
  role: "Student" | "Teacher";
}

export function TeacherDashboard(): ReactElement {

    const user = useLoaderData() as ClaimsResponse;
    const [showForm, setShowForm] = useState(false);

  
  return (
      <main id="teacher" className="g-container">
      <h2>Teachers Dashboard</h2>
      <p>Welcome, {user.role}</p>
      <p>Your email: {user.email}</p>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Registration" : "Register New User"}
      </button>

      {showForm && <Registration onClose={() => setShowForm(false)}/>}
    </main> 
  );
}
