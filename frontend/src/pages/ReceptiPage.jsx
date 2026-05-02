import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReceptiPage() {
  const [recepti, setRecepti] = useState([]);
  const [doktori, setDoktori] = useState([]);
  const [pacijenti, setPacijenti] = useState([]);
  const [lekovi, setLekovi] = useState([]);
  const navigate = useNavigate();

  const [noviRecept, setNoviRecept] = useState({
    datumIzdavanja: "",
    napomena: "",
    istekao: false,
    doktorId: "",
    pacijentId: "",
    kolicinaPakovanja: "",
    doziranje: "",
    napomenaStavke: "",
    lekId: "",
  });

  const ucitajSve = () => {
    fetch("http://localhost:8080/api/recepti")
      .then((res) => res.json())
      .then((data) => setRecepti(data))
      .catch((err) => console.error("Greška pri učitavanju recepata:", err));

    fetch("http://localhost:8080/api/doktori")
      .then((res) => res.json())
      .then((data) => setDoktori(data))
      .catch((err) => console.error("Greška pri učitavanju doktora:", err));

    fetch("http://localhost:8080/api/pacijenti")
      .then((res) => res.json())
      .then((data) => setPacijenti(data))
      .catch((err) => console.error("Greška pri učitavanju pacijenata:", err));

    fetch("http://localhost:8080/api/lekovi")
      .then((res) => res.json())
      .then((data) => setLekovi(data))
      .catch((err) => console.error("Greška pri učitavanju lekova:", err));
  };

  useEffect(() => {
    ucitajSve();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNoviRecept({
      ...noviRecept,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const dodajRecept = async (e) => {
    e.preventDefault();

    if (
      !noviRecept.datumIzdavanja ||
      !noviRecept.doktorId ||
      !noviRecept.pacijentId ||
      !noviRecept.lekId ||
      !noviRecept.kolicinaPakovanja ||
      !noviRecept.doziranje
    ) {
      alert("Popuni sva obavezna polja za recept.");
      return;
    }

    if (Number(noviRecept.kolicinaPakovanja) <= 0) {
      alert("Količina pakovanja mora biti veća od 0.");
      return;
    }

    const body = {
      datumIzdavanja: noviRecept.datumIzdavanja,
      napomena: noviRecept.napomena,
      istekao: noviRecept.istekao,
      doktorId: Number(noviRecept.doktorId),
      pacijentId: Number(noviRecept.pacijentId),
      stavke: [
        {
          rb: 1,
          kolicinaPakovanja: Number(noviRecept.kolicinaPakovanja),
          doziranje: noviRecept.doziranje,
          napomena: noviRecept.napomenaStavke,
          lekId: Number(noviRecept.lekId),
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:8080/api/recepti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert("Recept je uspešno dodat.");
        setNoviRecept({
          datumIzdavanja: "",
          napomena: "",
          istekao: false,
          doktorId: "",
          pacijentId: "",
          kolicinaPakovanja: "",
          doziranje: "",
          napomenaStavke: "",
          lekId: "",
        });
        ucitajSve();
      } else {
        alert("Dodavanje recepta nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri dodavanju recepta:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  const obrisiRecept = async (id) => {
    if (!window.confirm("Da li si siguran da želiš brisanje recepta?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/recepti/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Recept je uspešno obrisan.");
        ucitajSve();
      } else {
        alert("Brisanje recepta nije uspelo.");
      }
    } catch (error) {
      console.error("Greška pri brisanju recepta:", error);
      alert("Greška pri povezivanju sa backendom.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Evidencija recepata</h1>
          <p className="page-subtitle">
            Kreiranje, pregled i brisanje recepata.
          </p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/dashboard")}>
          Nazad
        </button>
      </div>

      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 className="form-section-title">Dodaj novi recept</h2>

        <form onSubmit={dodajRecept}>
          <div className="form-grid">
            <input
              type="date"
              name="datumIzdavanja"
              value={noviRecept.datumIzdavanja}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="napomena"
              placeholder="Napomena recepta"
              value={noviRecept.napomena}
              onChange={handleChange}
            />

            <select
              name="doktorId"
              value={noviRecept.doktorId}
              onChange={handleChange}
              required
            >
              <option value="">Izaberi doktora</option>
              {doktori.map((doktor) => (
                <option key={doktor.idDoktor} value={doktor.idDoktor}>
                  {doktor.ime} {doktor.prezime}
                </option>
              ))}
            </select>

            <select
              name="pacijentId"
              value={noviRecept.pacijentId}
              onChange={handleChange}
              required
            >
              <option value="">Izaberi pacijenta</option>
              {pacijenti.map((pacijent) => (
                <option key={pacijent.idPacijent} value={pacijent.idPacijent}>
                  {pacijent.ime} {pacijent.prezime}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="kolicinaPakovanja"
              placeholder="Količina pakovanja"
              value={noviRecept.kolicinaPakovanja}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="doziranje"
              placeholder="Doziranje"
              value={noviRecept.doziranje}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="napomenaStavke"
              placeholder="Napomena stavke"
              value={noviRecept.napomenaStavke}
              onChange={handleChange}
            />

            <select
              name="lekId"
              value={noviRecept.lekId}
              onChange={handleChange}
              required
            >
              <option value="">Izaberi lek</option>
              {lekovi.map((lek) => (
                <option key={lek.idLek} value={lek.idLek}>
                  {lek.naziv}
                </option>
              ))}
            </select>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="istekao"
              checked={noviRecept.istekao}
              onChange={handleChange}
            />
            <label>Istekao</label>
          </div>

          <div className="top-actions" style={{ marginTop: "15px" }}>
            <button type="submit">Dodaj recept</button>
          </div>
        </form>
      </div>

      {recepti.length === 0 ? (
        <div className="empty-state">Nema recepata.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Datum</th>
                <th>Napomena</th>
                <th>Doktor</th>
                <th>Pacijent</th>
                <th>Broj stavki</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {recepti.map((recept) => (
                <tr key={recept.idRecept}>
                  <td>{recept.idRecept}</td>
                  <td>{recept.datumIzdavanja}</td>
                  <td>{recept.napomena}</td>
                  <td>
                    {recept.doktor?.ime} {recept.doktor?.prezime}
                  </td>
                  <td>
                    {recept.pacijent?.ime} {recept.pacijent?.prezime}
                  </td>
                  <td>{recept.stavke?.length || 0}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="danger-btn"
                        onClick={() => obrisiRecept(recept.idRecept)}
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

export default ReceptiPage;