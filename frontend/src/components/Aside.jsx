import { Link } from 'react-router-dom';

function Aside() {
  return (
    <aside className="aside">
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/meta">Metas</Link></li>
          <li><Link to="/transacao">Transações</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;