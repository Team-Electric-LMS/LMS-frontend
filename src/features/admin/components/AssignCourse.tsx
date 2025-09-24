import { FormEventHandler, ReactElement, useState } from "react";
import { assignToCourse } from "../api";
import { IUpdateUser } from "../types";

interface FormProps {
  onClose: () => void;
  user: IUpdateUser
}

export function AssignCourse({
  onClose,
  user,
}: FormProps): ReactElement {
  
  const [course, setCourse] = useState<string>("");
  const [unassign, setUnassign] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);


  const raw = localStorage.getItem("tokens");
    const tokens = raw ? JSON.parse(raw) : null;

    if (user.role == "Teacher") setIsTeacher(true)



  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (course=="unassign")
      setUnassign(true)
      try {
        await assignToCourse(user.id, course, unassign, tokens.accessToken)
          
        onClose();
      } catch (err) {
        console.error("Error assigning user", err);
      }
    
    
  };

  return (
    <main id="login-page" className="g-container">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Assigning to course</legend>
          <label htmlFor="course">Choose course</label>
          <select
            value={course}
            id="role"
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">-- Select a course --</option>
            <option value="b2be605c-d851-4c2e-b89f-6485e59ad9be">Demo Course 1</option>
            <option value="813ea1b7-c693-4b20-aae9-aa7bce19bf7e">Demo Course 2</option>
            <option value="1a1c2212-2035-4a49-93ac-2b6c2b5af260">Demo Course 3</option>
            <option value="bcc7009f-93c6-429c-b5a8-330fdb6a8c07">Demo Course 4</option>
            <option value="unassign">Unassign from a course</option>
          </select>
          {<p style={{ color: "red" }}> Assigning a new course to user {user.email} </p>}
          {isTeacher && <p style={{ color: "red" }}> Impossible to assign course to teacher</p>}
                
          <button type="submit" disabled={isTeacher}>Submit</button>
        </fieldset>
      </form>
    </main>
  );
}
