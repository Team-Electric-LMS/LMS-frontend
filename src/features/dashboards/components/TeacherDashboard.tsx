import { ReactElement, useState } from 'react';
import { AdminComponent } from '../../auth/components';


export function TeacherDashboard(): ReactElement {

  return (
      <main id="teacher" className="g-container">
      <h2>Teachers Dashboard</h2>
      
    <AdminComponent/>
    </main> 
  );
}
