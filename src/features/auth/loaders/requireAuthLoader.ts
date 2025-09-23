import { redirect, type LoaderFunctionArgs } from 'react-router';
import { validateOrRefreshTokens } from '../utilities';
import { TOKENS } from '../constants';
import { ITokens } from '../types';
import { getUserClaimsLoader } from './getUserClaimsLoader';

export async function requireAuthLoader({ request }: LoaderFunctionArgs) {
  const raw = localStorage.getItem(TOKENS);
  const tokens = raw ? (JSON.parse(raw) as ITokens) : null;

  const next = await validateOrRefreshTokens(tokens);
  if (next) {
    // Update localStorage if refresh gave new tokens
    const nextRaw = JSON.stringify(next);
    if (nextRaw !== raw) {
      localStorage.setItem(TOKENS, nextRaw);
    }

    const claims = await getUserClaimsLoader();

    const url = new URL(request.url);
    if (url.pathname === "/") {
      if (claims.role === "Student") throw redirect("/student/dashboard");
      if (claims.role === "Teacher") throw redirect("/teacher/dashboard");
    }
    
    return null; // Let the route through
  }

  const url = new URL(request.url);
  const redirectTo = encodeURIComponent(url.pathname + url.search);

  console.log('Redirecting unauthenticated user => /login');
  throw redirect(`/login?redirectTo=${redirectTo}`);
}
