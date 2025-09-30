import { useEffect, useRef } from "react";
import { useUserForm } from "../hooks/useUserForm";
import { SelectInput, TextInput } from ".";
import { FormProps } from "../types";
import { useAdminContext } from "../context/adminProvider";

export function AdminForm({
  legend,
  onClose,
}: FormProps) {
  const { user, setUser, token } = useAdminContext();
  const {
    form,
    setFormField,
    emailAvailable,
    patternValid,
    emailChanged,
    error,
    checkEmail,
    submit,
  } = useUserForm(user);

  const emailTimer = useRef<number>(100);

  useEffect(() => {
    if (!form.email) return;
    if (emailTimer.current) clearTimeout(emailTimer.current);

    emailTimer.current = window.setTimeout(() => {
      if (token) checkEmail(token);
    }, 500);

    return () => {
      if (emailTimer.current) clearTimeout(emailTimer.current);
    };
  }, [form.email, token]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const updatedUser = await submit(token);
    if (updatedUser) {
      if (user && user.course) updatedUser.course = user?.course;
      setUser(updatedUser);
    }
      onClose();
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{legend}</legend>
                  <TextInput
            label="Email"
            name="email"
            value={form.email}
            onChange={(value) => {setFormField("email", value); setFormField("userName", value)}}
            required
            error={
              form.email && !patternValid
                ? "Invalid email format"
                : emailChanged && !emailAvailable
                ? "Email is already taken"
                : undefined
            }
          />
          {!user && (
            <TextInput
              label="Password"
              name="password"
              value={form.password || ""}
              onChange={(value) => setFormField("password", value)}
              type="password"
              required
            />
          )}
          <TextInput
            label="First Name"
            name="firstname"
            value={form.firstName}
            onChange={(value) => setFormField("firstName", value)}
          />
          <TextInput
            label="Last Name"
            name="lastname"
            value={form.lastName}
            onChange={(value) => setFormField("lastName", value)}
          />
          <SelectInput
            label="Role"
            name="role"
            value={form.role}
            onChange={(value) => setFormField("role", value)}
            options={["Student", "Teacher"]}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={emailChanged && !emailAvailable}>
            {user ? "Update" : "Register"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </fieldset>
      </form>
    </main>
  );
}
