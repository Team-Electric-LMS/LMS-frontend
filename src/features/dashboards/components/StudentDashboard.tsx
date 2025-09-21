import { ReactElement } from 'react';
import { useLoaderData } from "react-router";

interface ClaimsResponse {
  id: string;
  email: string;
  role: "Student" | "Teacher";
}

export function StudentDashboard(): ReactElement {

    const user = useLoaderData() as ClaimsResponse;

  
  return (
      <main id="teacher" className="g-container">
      <h2>Students Dashboard</h2>
      <p>Welcome, {user.role}</p>
      <p>Your ID: {user.email}</p>
    </main>
  );
}
