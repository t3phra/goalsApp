import React, { useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  Avatar,
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { NavLink, Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'

import Drawer from '../drawer/Drawer'
import { AuthContext } from '../../util/context/auth-context'
import useStyles from './Toolbar.style.'

import { MAIN_PAGE, STARTING_PAGE } from '../../util/constants/routes'

const ToolbarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { isLoggedIn, username, userAvatar, logout } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.root}>
        {isMobile && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          <Link to={isLoggedIn ? MAIN_PAGE : STARTING_PAGE}>
            Bread
            <Box component="span" color="secondary.main">
              crumbs
            </Box>
          </Link>
        </Typography>
        {isLoggedIn && (
          <div className={classes.userInfo} edge="end">
            <Typography className={classes.username}>{username}</Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenMenu}
            >
              <Avatar src={userAvatar} alt={username} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchorEl}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => {
                  logout()
                  handleCloseMenu()
                }}
              >
                Выход
                <ExitToApp className={classes.menuIcon} />
              </MenuItem>
            </Menu>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <NavLink to="/login" activeClassName={classes.activeNavLink}>
              <Button className={classes.authButton}>Вход</Button>
            </NavLink>
            {!isMobile && (
              <NavLink to="/sign_up" activeClassName={classes.activeNavLink}>
                <Button className={classes.authButton}>Регистрация</Button>
              </NavLink>
            )}
          </>
        )}
      </Toolbar>
      {isMobile && (
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => setIsDrawerOpen(true)}
        >
          drawer content
        </Drawer>
      )}
    </AppBar>
  )
}
export default ToolbarComponent
