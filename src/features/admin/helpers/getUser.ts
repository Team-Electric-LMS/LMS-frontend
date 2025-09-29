import { IUser } from "../types";
import { fetchUserExtended } from "../api";

export async function getUserByUsername(
  username: string,
  token: string
): Promise<IUser | null> {
  if (!username || !token) return null;

  try {
    const user = await fetchUserExtended(username, token);
    if (!user) return null;

    if (user.role == null) user.role = "";

    return user;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
}