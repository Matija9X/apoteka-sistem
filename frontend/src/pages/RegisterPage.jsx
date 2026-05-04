import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const praznaForma = {
    ime: "",
    prezime: "",
    datumZaposlenja: "",
    brojTelefona: "",
    email: "",
    adresa: "",
    plata: "",
    godineIskustva: "",
    sluzbeniBroj: "",
    brojLicence: "",
    specijalizacija: "",
    lozinka: "",
  };

  const [doktor, setDoktor] = useState(praznaForma);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoktor({
      ...doktor,
      [name]: value,
    });
  };

  const registrujDoktora = async (e) => {
    e.preventDefault();

    if (!doktor.ime || !doktor.prezime || !doktor.email || !doktor.lozinka) {
      alert("Ime, prezime, email i lozinka su obavezni.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/doktori/registracija", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...doktor,
          plata: Number(doktor.plata || 0),
          godineIskustva: Number(doktor.godineIskustva || 0),
        }),
      });

      if (response.ok) {
        alert("Registracija je uspešna. Sada se možete prijaviti.");
        setDoktor(praznaForma);
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.error || "Registracija nije uspela.");
      }
    } catch (error) {
      console.error("Greška pri registraciji:", error);
      alert("Frontend ne može da se poveže sa backendom.");
    }
  };

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h1>Registracija doktora</h1>
        <p className="page-subtitle">
          Unesite podatke za kreiranje doktorskog naloga.
        </p>

        <form onSubmit={registrujDoktora}>
          <div className="form-grid">
            <input name="ime" placeholder="Ime" value={doktor.ime} onChange={handleChange} required />
            <input name="prezime" placeholder="Prezime" value={doktor.prezime} onChange={handleChange} required />
            <input type="date" name="datumZaposlenja" value={doktor.datumZaposlenja} onChange={handleChange} />
            <input name="brojTelefona" placeholder="Broj telefona" value={doktor.brojTelefona} onChange={handleChange} />
            <input name="email" placeholder="Email" value={doktor.email} onChange={handleChange} required />
            <input name="adresa" placeholder="Adresa" value={doktor.adresa} onChange={handleChange} />
            <input type="number" name="plata" placeholder="Plata" value={doktor.plata} onChange={handleChange} />
            <input type="number" name="godineIskustva" placeholder="Godine iskustva" value={doktor.godineIskustva} onChange={handleChange} />
            <input name="sluzbeniBroj" placeholder="Službeni broj" value={doktor.sluzbeniBroj} onChange={handleChange} />
            <input name="brojLicence" placeholder="Broj licence" value={doktor.brojLicence} onChange={handleChange} />
            <input name="specijalizacija" placeholder="Specijalizacija" value={doktor.specijalizacija} onChange={handleChange} />
            <input type="password" name="lozinka" placeholder="Lozinka" value={doktor.lozinka} onChange={handleChange} required />
          </div>

          <div className="top-actions" style={{ marginTop: "20px" }}>
            <button type="submit">Registruj se</button>
            <button type="button" className="secondary-btn" onClick={() => navigate("/")}>
              Nazad na prijavu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;