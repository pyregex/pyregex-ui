import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

export default function TopBar() {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          PyRegex
          <small> :: Your Python Regular Expression's Best Buddy</small>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
