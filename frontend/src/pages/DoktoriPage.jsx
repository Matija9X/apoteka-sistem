import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoktoriPage() {
  const [doktori, setDoktori] = useState([]);
  const [editId, setEditId] = useState(null);
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

  const [noviDoktor, setNoviDoktor] = useState(praznaForma);

  const ucitajDoktore = () => {
    fetch("http://localhost:8080/api/doktori")
      .then((response) => response.json())
      .then((data) => setDoktori(data))
      .catch((error) => console.error("Greška pri učitavanju doktora:", error));
  };

  useEffect(() => {
    ucitajDoktore();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoviDoktor({
      ...noviDoktor,
      [name]: value,
    });
  };

  const resetForme = () => {
    setNoviDoktor(praznaForma);
    setEditId(null);
  };

  const popuniFormuZaIzmenu = (doktor) => {
    setEditId(doktor.idDoktor);
    setNoviDoktor({
      ime: doktor.ime || "",
      prezime: doktor.prezime || "",
      datumZaposlenja: doktor.datumZaposlenja || "",
      brojTelefona: doktor.brojTelefona || "",
      email: doktor.email || "",
      adresa: doktor.adresa || "",
      plata: doktor.plata ?? "",
      godineIskustva: doktor.godineIskustva ?? "",
      sluzbeniBroj: doktor.sluzbeniBroj || "",
      brojLicence: doktor.brojLicence || "",
      specijalizacija: doktor.specijalizacija || "",
      lozinka: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sacuvajDoktora = async (e) => {
    e.preventDefault();

    if (
      !noviDoktor.ime ||
      !noviDoktor.prezime ||
      !noviDoktor.email ||
      (!editId && !noviDoktor.lozinka)
    ) {
      alert("Ime, prezime, email i lozinka su obavezni.");
      return;
    }

    const body = {
      ...noviDoktor,
      plata: Number(noviDoktor.plata || 0),
      godineIskustva: Number(noviDoktor.godineIskustva || 0),
    };

    if (editId && !noviDoktor.lozinka) {
      delete body.lozinka;
    }

    try {
      const url = editId
        ? `http://localhost:8080/api/doktori/${editId}`
        : "http://localhost:8080/api/doktori";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editId ? "Doktor je uspešno izmenjen." : "Doktor je uspešno dodat.");
        resetForme();
        ucitajDoktore();
      } else {
        alert(editId ? "Izmena doktora nije uspela." : "Dodavanje doktora nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri čuvanju doktora:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  const obrisiDoktora = async (id) => {
    if (!window.confirm("Da li si siguran da želiš brisanje doktora?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/doktori/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Doktor je uspešno obrisan.");
        ucitajDoktore();
      } else {
        alert("Brisanje doktora nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri brisanju doktora:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Evidencija doktora</h1>
          <p className="page-subtitle">
            Pregled, dodavanje, izmena i brisanje doktora.
          </p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/dashboard")}>
          Nazad
        </button>
      </div>

      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 className="form-section-title">
          {editId ? "Izmena doktora" : "Dodaj novog doktora"}
        </h2>

        <form onSubmit={sacuvajDoktora}>
          <div className="form-grid">
            <input name="ime" placeholder="Ime" value={noviDoktor.ime} onChange={handleChange} required />
            <input name="prezime" placeholder="Prezime" value={noviDoktor.prezime} onChange={handleChange} required />
            <input type="date" name="datumZaposlenja" value={noviDoktor.datumZaposlenja} onChange={handleChange} />
            <input name="brojTelefona" placeholder="Broj telefona" value={noviDoktor.brojTelefona} onChange={handleChange} />
            <input name="email" placeholder="Email" value={noviDoktor.email} onChange={handleChange} required />
            <input name="adresa" placeholder="Adresa" value={noviDoktor.adresa} onChange={handleChange} />
            <input type="number" name="plata" placeholder="Plata" value={noviDoktor.plata} onChange={handleChange} />
            <input type="number" name="godineIskustva" placeholder="Godine iskustva" value={noviDoktor.godineIskustva} onChange={handleChange} />
            <input name="sluzbeniBroj" placeholder="Službeni broj" value={noviDoktor.sluzbeniBroj} onChange={handleChange} />
            <input name="brojLicence" placeholder="Broj licence" value={noviDoktor.brojLicence} onChange={handleChange} />
            <input name="specijalizacija" placeholder="Specijalizacija" value={noviDoktor.specijalizacija} onChange={handleChange} />
            <input
              type="password"
              name="lozinka"
              placeholder={editId ? "Nova lozinka (opciono)" : "Lozinka"}
              value={noviDoktor.lozinka}
              onChange={handleChange}
            />
          </div>

          <div className="top-actions" style={{ marginTop: "15px" }}>
            <button type="submit">
              {editId ? "Sačuvaj izmene" : "Dodaj doktora"}
            </button>

            {editId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForme}
              >
                Otkaži izmenu
              </button>
            )}
          </div>
        </form>
      </div>

      {doktori.length === 0 ? (
        <div className="empty-state">Nema doktora.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Email</th>
                <th>Specijalizacija</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {doktori.map((doktor) => (
                <tr key={doktor.idDoktor}>
                  <td>{doktor.idDoktor}</td>
                  <td>{doktor.ime}</td>
                  <td>{doktor.prezime}</td>
                  <td>{doktor.email}</td>
                  <td>{doktor.specijalizacija}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="secondary-btn"
                        onClick={() => popuniFormuZaIzmenu(doktor)}
                      >
                        Izmeni
                      </button>
                      <button
                        className="danger-btn"
                        onClick={() => obrisiDoktora(doktor.idDoktor)}
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

export default DoktoriPage;