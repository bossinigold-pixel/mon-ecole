import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import { useAuthStore } from "../lib/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const setTokens = useAuthStore((s) => s.setTokens);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      setTokens(res.data);
      navigate("/catalogue");
    } catch {
      setError("Email ou mot de passe incorrect.");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 font-medium"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
