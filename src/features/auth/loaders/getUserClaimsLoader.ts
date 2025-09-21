import { redirect } from "react-router";
import { TOKENS } from '../constants';
import { ITokens } from '../types';
import { BASE_URL } from '../../shared/constants';

export interface ClaimsResponse {
  id: string;
  email: string;
  role: "Student" | "Teacher";
}


export async function getUserClaimsLoader() {
  const raw = localStorage.getItem(TOKENS);
  if (!raw) throw redirect("/login");

  const tokens: ITokens = JSON.parse(raw);
  if (!tokens?.accessToken) throw redirect("/login");

  const res = await fetch(`${BASE_URL}/auth/user/`, {
    headers: { Authorization: `Bearer ${tokens.accessToken}` },
  });

  if (!res.ok) throw redirect("/login");

  const data: ClaimsResponse = await res.json();
  return data; 
}