import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PacijentiPage() {
  const [pacijenti, setPacijenti] = useState([]);
  const navigate = useNavigate();

  const [noviPacijent, setNoviPacijent] = useState({
    ime: "",
    prezime: "",
    datumRodjenja: "",
    brojTelefona: "",
    adresa: "",
    email: "",
    pol: "",
    krvnaGrupa: "",
    stanjeZdravlja: "",
    lbo: "",
  });

  const ucitajPacijente = () => {
    fetch("http://localhost:8080/api/pacijenti")
      .then((response) => response.json())
      .then((data) => setPacijenti(data))
      .catch((error) => console.error("Greška pri učitavanju pacijenata:", error));
  };

  useEffect(() => {
    ucitajPacijente();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoviPacijent({
      ...noviPacijent,
      [name]: value,
    });
  };

  const dodajPacijenta = async (e) => {
    e.preventDefault();

    if (!noviPacijent.ime || !noviPacijent.prezime || !noviPacijent.lbo) {
      alert("Ime, prezime i LBO su obavezni.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/pacijenti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noviPacijent),
      });

      if (response.ok) {
        alert("Pacijent je uspešno dodat.");
        setNoviPacijent({
          ime: "",
          prezime: "",
          datumRodjenja: "",
          brojTelefona: "",
          adresa: "",
          email: "",
          pol: "",
          krvnaGrupa: "",
          stanjeZdravlja: "",
          lbo: "",
        });
        ucitajPacijente();
      } else {
        alert("Dodavanje pacijenta nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri dodavanju pacijenta:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  const obrisiPacijenta = async (id) => {
    if (!window.confirm("Da li si siguran da želiš brisanje pacijenta?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/pacijenti/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Pacijent je uspešno obrisan.");
        ucitajPacijente();
      } else {
        alert("Brisanje pacijenta nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri brisanju pacijenta:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Evidencija pacijenata</h1>
          <p className="page-subtitle">
            Pregled i upravljanje podacima o pacijentima.
          </p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/dashboard")}>
          Nazad
        </button>
      </div>

      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 className="form-section-title">Dodaj novog pacijenta</h2>

        <form onSubmit={dodajPacijenta}>
          <div className="form-grid">
            <input name="ime" placeholder="Ime" value={noviPacijent.ime} onChange={handleChange} required />
            <input name="prezime" placeholder="Prezime" value={noviPacijent.prezime} onChange={handleChange} required />
            <input name="datumRodjenja" type="date" value={noviPacijent.datumRodjenja} onChange={handleChange} />
            <input name="brojTelefona" placeholder="Broj telefona" value={noviPacijent.brojTelefona} onChange={handleChange} />
            <input name="adresa" placeholder="Adresa" value={noviPacijent.adresa} onChange={handleChange} />
            <input name="email" placeholder="Email" value={noviPacijent.email} onChange={handleChange} />
            <input name="pol" placeholder="Pol" value={noviPacijent.pol} onChange={handleChange} />
            <input name="krvnaGrupa" placeholder="Krvna grupa" value={noviPacijent.krvnaGrupa} onChange={handleChange} />
            <input name="stanjeZdravlja" placeholder="Stanje zdravlja" value={noviPacijent.stanjeZdravlja} onChange={handleChange} />
            <input name="lbo" placeholder="LBO" value={noviPacijent.lbo} onChange={handleChange} required />
          </div>

          <div className="top-actions" style={{ marginTop: "15px" }}>
            <button type="submit">Dodaj pacijenta</button>
          </div>
        </form>
      </div>

      {pacijenti.length === 0 ? (
        <div className="empty-state">Nema pacijenata.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Email</th>
                <th>LBO</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {pacijenti.map((pacijent) => (
                <tr key={pacijent.idPacijent}>
                  <td>{pacijent.idPacijent}</td>
                  <td>{pacijent.ime}</td>
                  <td>{pacijent.prezime}</td>
                  <td>{pacijent.email}</td>
                  <td>{pacijent.lbo}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="danger-btn"
                        onClick={() => obrisiPacijenta(pacijent.idPacijent)}
                      >
                        Obriši
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PacijentiPage;