import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LekoviPage() {
  const [lekovi, setLekovi] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const praznaForma = {
    naziv: "",
    jkl: "",
    inn: "",
    farmaceutskiOblik: "",
    doza: "",
    datumIsteka: "",
    proizvodjac: "",
    cena: "",
    sporednaDejstva: "",
    kontraindikacije: "",
    minDoza: "",
    maxDoza: "",
    potrebanRecept: false,
  };

  const [noviLek, setNoviLek] = useState(praznaForma);

  const ucitajLekove = () => {
    fetch("http://localhost:8080/api/lekovi")
      .then((response) => response.json())
      .then((data) => setLekovi(data))
      .catch((error) => console.error("Greška pri učitavanju lekova:", error));
  };

  useEffect(() => {
    ucitajLekove();
  }, []);

  const obrisiLek = async (id) => {
    if (!window.confirm("Da li si siguran da želiš brisanje leka?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/lekovi/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Lek je uspešno obrisan.");
        ucitajLekove();
      } else {
        alert("Lek nije moguće obrisati jer je već korišćen u receptu.");
      }
    } catch (error) {
      console.error("Greška pri brisanju leka:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNoviLek({
      ...noviLek,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForme = () => {
    setNoviLek(praznaForma);
    setEditId(null);
  };

  const popuniFormuZaIzmenu = (lek) => {
    setEditId(lek.idLek);
    setNoviLek({
      naziv: lek.naziv || "",
      jkl: lek.jkl || "",
      inn: lek.inn || "",
      farmaceutskiOblik: lek.farmaceutskiOblik || "",
      doza: lek.doza || "",
      datumIsteka: lek.datumIsteka || "",
      proizvodjac: lek.proizvodjac || "",
      cena: lek.cena ?? "",
      sporednaDejstva: lek.sporednaDejstva || "",
      kontraindikacije: lek.kontraindikacije || "",
      minDoza: lek.minDoza ?? "",
      maxDoza: lek.maxDoza ?? "",
      potrebanRecept: lek.potrebanRecept || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sacuvajLek = async (e) => {
    e.preventDefault();

    if (!noviLek.naziv || !noviLek.jkl || !noviLek.cena) {
      alert("Popuni obavezna polja za lek.");
      return;
    }

    if (Number(noviLek.cena) <= 0) {
      alert("Cena mora biti veća od 0.");
      return;
    }

    const body = JSON.stringify({
      ...noviLek,
      cena: Number(noviLek.cena),
      minDoza: Number(noviLek.minDoza || 0),
      maxDoza: Number(noviLek.maxDoza || 0),
    });

    try {
      const url = editId
        ? `http://localhost:8080/api/lekovi/${editId}`
        : "http://localhost:8080/api/lekovi";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        alert(editId ? "Lek je uspešno izmenjen." : "Lek je uspešno dodat.");
        resetForme();
        ucitajLekove();
      } else {
        alert(editId ? "Izmena leka nije uspela." : "Dodavanje leka nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri čuvanju leka:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Evidencija lekova</h1>
          <p className="page-subtitle">
            Pregled, dodavanje, izmena i brisanje lekova.
          </p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/dashboard")}>
          Nazad
        </button>
      </div>

      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 className="form-section-title">
          {editId ? "Izmena leka" : "Dodaj novi lek"}
        </h2>

        <form onSubmit={sacuvajLek}>
          <div className="form-grid">
            <input name="naziv" placeholder="Naziv" value={noviLek.naziv} onChange={handleChange} required />
            <input name="jkl" placeholder="JKL" value={noviLek.jkl} onChange={handleChange} required />
            <input name="inn" placeholder="INN" value={noviLek.inn} onChange={handleChange} />
            <input name="farmaceutskiOblik" placeholder="Farmaceutski oblik" value={noviLek.farmaceutskiOblik} onChange={handleChange} />
            <input name="doza" placeholder="Doza" value={noviLek.doza} onChange={handleChange} />
            <input name="datumIsteka" type="date" value={noviLek.datumIsteka} onChange={handleChange} />
            <input name="proizvodjac" placeholder="Proizvođač" value={noviLek.proizvodjac} onChange={handleChange} />
            <input name="cena" type="number" placeholder="Cena" value={noviLek.cena} onChange={handleChange} />
            <input name="sporednaDejstva" placeholder="Sporedna dejstva" value={noviLek.sporednaDejstva} onChange={handleChange} />
            <input name="kontraindikacije" placeholder="Kontraindikacije" value={noviLek.kontraindikacije} onChange={handleChange} />
            <input name="minDoza" type="number" placeholder="Min doza" value={noviLek.minDoza} onChange={handleChange} />
            <input name="maxDoza" type="number" placeholder="Max doza" value={noviLek.maxDoza} onChange={handleChange} />
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="potrebanRecept"
              checked={noviLek.potrebanRecept}
              onChange={handleChange}
            />
            <label>Potreban recept</label>
          </div>

          <div className="top-actions" style={{ marginTop: "15px" }}>
            <button type="submit">
              {editId ? "Sačuvaj izmene" : "Dodaj lek"}
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

      {lekovi.length === 0 ? (
        <div className="empty-state">Nema lekova.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>JKL</th>
                <th>INN</th>
                <th>Oblik</th>
                <th>Doza</th>
                <th>Proizvođač</th>
                <th>Cena</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {lekovi.map((lek) => (
                <tr key={lek.idLek}>
                  <td>{lek.idLek}</td>
                  <td>{lek.naziv}</td>
                  <td>{lek.jkl}</td>
                  <td>{lek.inn}</td>
                  <td>{lek.farmaceutskiOblik}</td>
                  <td>{lek.doza}</td>
                  <td>{lek.proizvodjac}</td>
                  <td>{lek.cena}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="secondary-btn"
                        onClick={() => popuniFormuZaIzmenu(lek)}
                      >
                        Izmeni
                      </button>
                      <button
                        className="danger-btn"
                        onClick={() => obrisiLek(lek.idLek)}
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

export default LekoviPage;