import { API_BASE_URL } from '@/constants/network';

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
