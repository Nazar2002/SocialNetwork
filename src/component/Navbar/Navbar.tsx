import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar: React.FC = () => {
  return(
    <nav className={s.nav}>
      <div>
        <NavLink to="/Profile" activeClassName={s.activeLink}>Profile</NavLink>
      </div>
      <div>
        <NavLink to="/Dialogs" activeClassName={s.activeLink}>Messages</NavLink>
      </div>
      <div>
        <NavLink to="/Users" activeClassName={s.activeLink}>Users</NavLink>
      </div>
      <div>
        <NavLink to="/News" activeClassName={s.activeLink}>News</NavLink>
      </div>
      <div className ={s.item}>
        <NavLink to="/Music" activeClassName={s.activeLink}>Music</NavLink>
      </div>
    </nav>
  )
}

export default Navbar;