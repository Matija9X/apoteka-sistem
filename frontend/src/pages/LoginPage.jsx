import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !lozinka) {
      alert("Unesi email i lozinku.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/doktori/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, lozinka }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("ulogovaniDoktor", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        alert(data.error || data.poruka || "Greška pri prijavi");
      }
    } catch (error) {
      console.error("Greška:", error);
      alert("Frontend ne može da se poveže sa backendom.");
    }
  };

  return (
    <div className="login-container">
      <h1>Sistem za upravljanje receptima</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Prijava doktora
      </p>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Lozinka:</label>
          <input
            type="password"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            required
          />
        </div>

        <button type="submit">Prijava</button>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
  <p>Nemate nalog?</p>
  <button
    type="button"
    className="secondary-btn"
    onClick={() => navigate("/registracija")}
  >
    Registruj se
  </button>
</div>
      </form>
    </div>
  );
}

export default LoginPage;