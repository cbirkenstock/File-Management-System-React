import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { FlatDataType } from '../types/types';
import { Navigation } from './components/Navigation';
import { Preview } from './components/Preview';
import { AppContext, defaultFile } from './AppContext';

export const App = () => {
  const [selectedFile, setSelectedFile] = useState<FlatDataType | null>(
    defaultFile
  );
  const [subFiles, setSubFiles] = useState<FlatDataType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([
    defaultFile.id,
  ]);

  return (
    <AppContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        subFiles,
        setSubFiles,
        searchTerm,
        setSearchTerm,
        expandedItemIds,
        setExpandedItemIds,
      }}
    >
      {/* this a just a div that you can style internally and it's layed 
      out in grid view for the files -- not exactly sure why this outer grid layer is
      necessary*/}
      {/* <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 2fr',
          height: '100%',
          overflow: 'hidden',
        }}
      > */}
      {/* app bar is just mui component for creating nav bar */}
      <AppBar position="sticky">
        <Toolbar variant="regular">
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Home Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, auto) 1fr',
          gridGap: '20px',
          height: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Navigation />
        <Preview />
      </Box>
      {/* </Box> */}
    </AppContext.Provider>
  );
};
