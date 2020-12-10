import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { LoginPage, LogoutPage } from './LoginPage';
import './styles/home.css';

const useStyles = makeStyles(() => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#644E5B' },
    'border-radius': 0,
    padding: 0,
  },
  dropdownStyle: {
    position: 'relative',
    float: 'right',
  },
}));

const Navigation = ({ user, isAuth, setAuth }) => {
  const styles = useStyles();

  function Authenticated() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    if (isAuth) {
      return (
        <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Dictionary">Dictionary</NavLink>
          <NavLink to="/Quiz">Quiz</NavLink>
          <NavLink to="/News">News</NavLink>
          <NavLink to="/Map">Map</NavLink>
          <div className="login-page">
            <IconButton className={styles.customHoverFocus} onClick={handleMenu} color="inherit" padding="0px">
              <AccountBoxIcon style={{ color: 'white', fontSize: '30px' }} />
              {' '}
              <p>
                {' '}
                {user}
                {' '}
              </p>
            </IconButton>
            <div className="menu">
              <Menu
                className={styles.dropdownStyle}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem className={styles.dropdownStyle} onClick={handleClose}>
                  {' '}
                  <LogoutPage setIsAuth={setAuth} />
                  {' '}
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="topnav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Dictionary">Dictionary</NavLink>
        <NavLink to="/Quiz">Quiz</NavLink>
        <NavLink to="/News">News</NavLink>
        <NavLink to="/Map">Map</NavLink>
        <div className="login-page">
          <IconButton className={styles.customHoverFocus} onClick={handleMenu} color="inherit">
            <p> LOGIN </p>
          </IconButton>
          <Menu
            className={styles.dropdownStyle}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem className={styles.dropdownStyle} onClick={handleClose}>
              {' '}
              <LoginPage setIsAuth={setAuth} />
              {' '}
            </MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
  return (
    <div>
      {Authenticated()}
    </div>
  );
};
export default Navigation;
