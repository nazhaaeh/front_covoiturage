const API_URL = 'https://localhost:7228/api';


export async function registerUser(data: any) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get("content-type");

  let result;
  if (contentType && contentType.includes("application/json")) {
    result = await response.json();
  } else {
    result = await response.text(); 
  }

  if (!response.ok) {
    throw new Error(result?.message || result || "Erreur d'inscription");
  }

  return result;
}

export async function loginUser(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error("Erreur login");
    return response.json();
}



export async function getRoles() {
    const response = await fetch(`${API_URL}/auth/roles`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error("Erreur lors de la récupération des rôles");
    return response.json();
}
