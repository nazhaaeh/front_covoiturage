const API_URL = 'https://localhost:7228/api/auth';

export async function registerUser(data: any) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Erreur inscription");
    return response.json();
}

export async function loginUser(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error("Erreur login");
    return response.json();
}
