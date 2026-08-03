const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export type ApiMenuItem = { id: string; name: string; description?: string | null; price: number; is_vegetarian: boolean; is_available: boolean; image_key?: string; category?: string; calories?: number; time?: number };
export async function getMenuItems(): Promise<ApiMenuItem[]> {
  const response = await fetch(`${API_URL}/catalog/menu`);
  if (!response.ok) throw new Error("Could not load menu from the server");
  return response.json();
}
export async function healthCheck(): Promise<boolean> { try { return (await fetch(`${API_URL}/`, { signal: AbortSignal.timeout(3000) })).ok; } catch { return false; } }
