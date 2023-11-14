import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFeather,
  faLongArrowUp,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success('Logout Successfully');
      navigate('/login');
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h4'>
            <Link className='headericon' to='/'>
              <FontAwesomeIcon icon={faFeather} /> Plug I'n
            </Link>
          </Typography>
          {isLogin && (
            <Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
              <Tabs
                textColor='inherit'
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label='Blogs' LinkComponent={Link} to='/blogs' />
                <Tab label='My Blogs' LinkComponent={Link} to='/my-blogs' />
                <Tab
                  label='Create Blog'
                  LinkComponent={Link}
                  to='/create-blog'
                />
              </Tabs>
            </Box>
          )}
          <Box display={'flex'} marginLeft='auto'>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: 'white' }}
                  LinkComponent={Link}
                  to='/login'
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ marginRight: '5px' }}
                  />{' '}
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: 'white' }}
                  LinkComponent={Link}
                  to='/register'
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: '5px' }}
                  />
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>
                <FontAwesomeIcon
                  icon={faLongArrowUp}
                  style={{ marginRight: '5px' }}
                />{' '}
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
