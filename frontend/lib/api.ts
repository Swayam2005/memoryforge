const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

async function request(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }

  return response.json();
}

export const api = {
  // =========================
  // Dashboard
  // =========================

  dashboard: () => request("/dashboard"),

  // =========================
  // History
  // =========================

  history: () => request("/history"),

  getMemories: () => request("/memory"),

  // =========================
  // Remember
  // =========================

  remember: (text: string) =>
    request("/remember", {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    }),

  // =========================
  // Recall
  // =========================

  recall: (query: string) =>
    request("/recall", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    }),

  // =========================
  // Forget (Legacy)
  // =========================

  forget: (query: string) =>
    request("/forget", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    }),

  // =========================
  // Memory CRUD
  // =========================

  updateMemory: (
    id: string,
    text: string
  ) =>
    request(`/memory/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        text,
      }),
    }),

  deleteMemory: (id: string) =>
    request(`/memory/${id}`, {
      method: "DELETE",
    }),

  toggleFavorite: (id: string) =>
    request(`/memory/${id}/favorite`, {
      method: "PATCH",
    }),

  // =========================
  // Improve
  // =========================

  improve: () =>
    request("/improve", {
      method: "POST",
    }),
};

// Legacy exports

export const dashboard = api.dashboard;
export const history = api.history;

export const remember = api.remember;
export const recall = api.recall;
export const forget = api.forget;
export const improve = api.improve;

export const getMemories = api.getMemories;
export const updateMemory = api.updateMemory;
export const deleteMemory = api.deleteMemory;
export const toggleFavorite = api.toggleFavorite;