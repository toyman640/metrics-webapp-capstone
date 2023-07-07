import { Link } from 'react-router-dom';
import angleback from '../angle-back-w.png';
import settings from '../settings-back-w.png';

function Navbar() {
  return (
    <nav className="Navigation">
      <Link to="/"><img className="Menu-icon" src={angleback} alt="angle back" /></Link>
      <p className="Nav-header">
        2015 stats
      </p>
      <img className="Menu-icon" src={settings} alt="settings" />
    </nav>
  );
}

export default Navbar;
