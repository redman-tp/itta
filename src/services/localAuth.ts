import type { UserRole, UserProfile } from 'src/types/domain';

export interface AuthCredentials {
  email: string;
  password: string;
  role?: UserRole;
  name?: string;
}

interface LocalUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  name: string;
  createdAt: string;
}

interface LocalSession {
  token: string;
  userId: string;
  role: UserRole;
}

const USERS_KEY = 'itta_users';
const SESSION_KEY = 'itta_session';

function getUsers(): LocalUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as LocalUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: LocalUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(session: LocalSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession(): LocalSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalSession;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

async function hashPassword(password: string) {
  if (!window.crypto?.subtle) return password;
  const data = new TextEncoder().encode(password);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function registerLocal(credentials: AuthCredentials) {
  if (!credentials.role) {
    throw new Error('Role is required');
  }
  const users = getUsers();
  const email = credentials.email.toLowerCase();
  if (users.some((user) => user.email === email)) {
    throw new Error('Email already registered');
  }
  const passwordHash = await hashPassword(credentials.password);
  const user: LocalUser = {
    id: `usr-${Date.now()}`,
    email,
    passwordHash,
    role: credentials.role,
    name: credentials.name?.trim() || 'Itta User',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);

  const session: LocalSession = {
    token: `sess-${Date.now()}`,
    userId: user.id,
    role: user.role,
  };
  saveSession(session);

  const profile: UserProfile = {
    id: user.id,
    name: user.name,
    location: '',
  };

  return { session, user: profile };
}

export async function loginLocal(credentials: AuthCredentials) {
  const users = getUsers();
  const email = credentials.email.toLowerCase();
  const user = users.find((item) => item.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const passwordHash = await hashPassword(credentials.password);
  if (user.passwordHash !== passwordHash) {
    throw new Error('Invalid credentials');
  }

  const session: LocalSession = {
    token: `sess-${Date.now()}`,
    userId: user.id,
    role: user.role,
  };
  saveSession(session);

  const profile: UserProfile = {
    id: user.id,
    name: user.name,
    location: '',
  };

  return { session, user: profile };
}

export function logoutLocal() {
  clearSession();
}

export function hydrateSession() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  const user = users.find((item) => item.id === session.userId);
  if (!user) return null;
  const profile: UserProfile = {
    id: user.id,
    name: user.name,
    location: '',
  };
  return { session, user: profile };
}
