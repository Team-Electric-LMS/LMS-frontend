import { CustomError } from "../../shared/classes";
import { BASE_URL } from "../../shared/constants";
import { IUser } from "../types";

export async function RegistrationReq(
  user: IUser,
  token: string
): Promise<IUser> {
  const url = `${BASE_URL}/auth`;
  const res: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (res.status === 400) {
    throw new Error("User already registered!");
  }

  if (!res.ok) {
    throw new CustomError(res.status, "Registration failed.");
  }
  return (await res.json()) as IUser;
}

export async function EditUserReq(user: IUser, token: string): Promise<IUser> {
  console.log("sending", user);
  const url = `${BASE_URL}/auth/edit`;
  const res: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new CustomError(res.status, "Failed to update.");
  }
  return (await res.json()) as IUser;
}

export async function fetchUserByUserName(
  username: string,
  token: string
): Promise<IUser | null> {
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new CustomError(res.status, "Could not fetch a user");
  }

  return (await res.json()) as IUser;
}

export async function fetchUserExtended(
  username: string,
  token: string
): Promise<IUser | null> {
  const url = `${BASE_URL}/users/extended?email=${encodeURIComponent(username)}`;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new CustomError(res.status, "Could not fetch a user");
  }

  return (await res.json()) as IUser;
}


export async function checkEmailTaken(
  email: string,
  token: string
): Promise<boolean> {
  const url = `${BASE_URL}/auth/check-email/${email}`;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to check email");
  }

  return await res.json();
}

export async function assignToCourse(
  userId: string,
  courseId: string,
  unassign: boolean,
  token: string
): Promise<any> {
  var url = `${BASE_URL}/users/${userId}/assign?unassign=${unassign}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  });
  if (!res.ok) {
    throw new Error("Failed to check email");
  }

   if (res.status !== 204) { 
    const data = await res.json();
    console.log("Checked address:", data);
    return data;
  }
}
