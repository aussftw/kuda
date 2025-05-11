export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

const API_URL = "https://artjoms-spole.fly.dev";

export async function signup(payload: SignupPayload) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Signup failed");
  }

  return result;
}

export async function getAccountData(username: string, password: string) {
  const response = await fetch(`${API_URL}/account`, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch account data");
  }

  return result;
}
