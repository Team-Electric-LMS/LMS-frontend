import { CustomError } from '../../shared/classes';
import { BASE_URL } from '../../shared/constants';
import { IUpdateUser, IRegisterUser } from '../types';

export async function RegistrationReq(password: string, email: string, username: string, role: string, firstname: string, lastname: string): Promise<any> {
  const url = `${BASE_URL}/auth`;
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email, username, role, firstname, lastname }),
  });
  
  if (!res.ok) {
    throw new CustomError(res.status, 'Could not Register a new user');
  }
  return (await res);

  // return (await res.json()) as IRegisterUser;
}


export async function EditUserReq(id: string, email: string, username: string, role: string, firstname: string, lastname: string): Promise<any> {
  const url = `${BASE_URL}/auth/edit`;
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, email, username, role, firstname, lastname }),
  });
  
  if (!res.ok) {
    throw new CustomError(res.status, 'Could not update a user');
  }

  return (await res);
}


export async function fetchUserByUserName(username: string, token: string): Promise<IUpdateUser> {
  const url = `${BASE_URL}/users/username/${encodeURIComponent(username)}`;

  const res: Response = await fetch(url, {
    method: 'GET',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    throw new CustomError(res.status, 'Could not fetch a user');
  }

  return (await res.json()) as IUpdateUser;
}

export async function checkEmailExists(email: string, token: string): Promise<boolean> {
  const url = `${BASE_URL}/auth/check-email/${email}`;
  

  const res: Response = await fetch(url, {
    method: 'GET',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to check email");
  }

  const data = await res.json();
  console.log("Checked adress:", url, data);
  return data;
}