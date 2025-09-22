import { CustomError } from '../../shared/classes';
import { BASE_URL } from '../../shared/constants';

export async function RegistrationReq(password: string, email: string, username: string, role: string, firstname: string, lastname: string): Promise<any> {
  const url = `${BASE_URL}/auth`;

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email, username, role, firstname, lastname }),
  });
  
  if (response.ok === false) {
    throw new CustomError(response.status, 'Could not Register a new user');
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}