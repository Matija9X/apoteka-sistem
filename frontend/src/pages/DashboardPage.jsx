import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const doktor = JSON.parse(localStorage.getItem("ulogovaniDoktor"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ulogovaniDoktor");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Sistem za upravljanje receptima</h1>
          <p className="page-subtitle">
            Centralno mesto za upravljanje doktorima, pacijentima, lekovima i receptima.
          </p>
          <p>
            Ulogovani doktor:{" "}
            <strong>
              {doktor?.ime} {doktor?.prezime}
            </strong>
          </p>
          <p>Email adresa: {doktor?.email}</p>
        </div>

        <button className="danger-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/doktori")}>
          <h2>Doktori</h2>
          <p>Pregled, dodavanje i brisanje doktora u sistemu</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/pacijenti")}>
          <h2>Pacijenti</h2>
          <p>Pregled, dodavanje i brisanje pacijenata</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/lekovi")}>
          <h2>Lekovi</h2>
          <p>Pregled, dodavanje i brisanje lekova</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/recepti")}>
          <h2>Recepti</h2>
          <p>Kreiranje, pregled i brisanje recepata</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;