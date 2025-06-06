import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({ toggleDrawer }) {
    return (
        <Box
            className="absolute top-0 left-0 w-full z-2"
            sx={{
                flexGrow: 1,
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'black' }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            flexGrow: 1, // Pushes the next Typography to the right
                        }}
                    >
                        GeoGraphy & Maps
                    </Typography>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        Created by: <a href="https://github.com/ErManoj-Sharma" >Manoj Sharma</a>
                    </Typography> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
