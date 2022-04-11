import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import { NavigationItems } from './NavigationItems';
import styled from 'styled-components';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const Navigation = () => {
  const appContext = useContext(AppContext);
  return (
    <Box sx={{ padding: '5px', overflow: 'auto' }}>
      <SearchDiv>
        <SearchInput
          onChange={(event) => {
            appContext.setSearchTerm(event.target.value.toLowerCase());
          }}
          placeholder="Search Top Level"
          type="text"
          value={appContext.searchTerm ?? ''}
        />
      </SearchDiv>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<FolderOpen />}
        defaultExpandIcon={<Folder />}
        expanded={appContext.expandedItemIds}
        selected={appContext.selectedFile?.id}
      >
        <NavigationItems itemId="" />
      </TreeView>
    </Box>
  );
};

const SearchDiv = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  border-radius: 4px;
  background-color: rgba(213, 232, 240, 0.3);
  transition: 0.3s all;
  border-radius: 10px;
  overflow: hidden;
  padding-left: 5px;
  margin-bottom: 10px;
  margin-top: 5px;
  :hover {
    background-color: rgba(213, 232, 240, 0.6);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: 0px solid;
  font-size: 18px;
  outline: none;
  flex: 1;
`;
