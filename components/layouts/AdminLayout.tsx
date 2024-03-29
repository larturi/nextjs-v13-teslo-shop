import React, { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';

interface Props {
    children: ReactNode;
    title: string;
    subtitle: string;
    icon?: JSX.Element;
}

export const AdminLayout:FC<Props> = ({
    children,
    title,
    subtitle,
    icon,
}) => {
  return (
    <>
        <nav>
            <AdminNavbar />
        </nav>

        <SideMenu />

        <main style={{ 
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px',
        }}>
            <Box display="flex" flexDirection="column">
                <Typography variant="h1" component="h1">
                    { icon }
                    {' '}
                    { title }
                </Typography>

                <Typography variant="h2" component="h2" sx={{ mb: 2, mt:1, fontSize: 16 }}>
                    { subtitle }
                </Typography>
            </Box>

            <Box className="fadeIn">
                {children}
            </Box>
        </main>
    </>
  )
}
