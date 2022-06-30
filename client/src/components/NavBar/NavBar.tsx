import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image from '../../img/oie_transparent.png';
import './NavBar.css';
import { selectCurrentUser } from '../../slices/authentication/authSlice';
import { useSelector } from 'react-redux';
import Logout from '../Logout/Logout';
import { BsFillKeyFill } from 'react-icons/bs';
import { BsPersonCheckFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
	const currentUser = useSelector(selectCurrentUser);
  const location = useLocation()
	const rechargePage = () => {
		if (
			 location.pathname === '/'
		) {
			window.location.reload();
		}
	};
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-log" onClick={() => rechargePage()}>
				<img src={image} alt="img" />
			</Link>
			<div className="navbar_bg_mid">
				<ul className="navbar_bg_ul">
					<li className="navbar_bg_li">
						{' '}
						<NavLink
							className="navbar_bg_a"
							to="/"
							onClick={() => rechargePage()}
						>
							Home
						</NavLink>{' '}
					</li>

					<li className="navbar_bg_li">
						{' '}
						<NavLink className="navbar_bg_a" to="/welcome">
							Perfíl
						</NavLink>{' '}
					</li>
					<li className="navbar_bg_li">
						{' '}
						<NavLink className="navbar_bg_a" to="/favorites">
							Favoritos
						</NavLink>{' '}
					</li>
				</ul>
			</div>
			{!currentUser && (
				<div className="prueba_btn">
					<Link className="container_buttons" to="/login">
						<button className="navBar-btn-login">
							<BsFillKeyFill className="icon" /> Ingresar
						</button>
					</Link>
					<Link className="container_buttons" to="/signup">
						<button className="navBar-btn-register">
							<BsPersonCheckFill className="icon" />
							Registrarse
						</button>
					</Link>
				</div>
			)}
			{currentUser && (
				<div>
					<Logout />
				</div>
			)}
		</nav>
	);
};

export default NavBar;
