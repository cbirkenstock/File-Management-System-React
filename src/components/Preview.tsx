import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { AppContext } from '../AppContext';
import { Action, useQuery } from 'react-fetching-library';
import { FlatDataType } from '../../types/types';

export const Preview = () => {
  const appContext = useContext(AppContext);
  const [items, setItems] = useState<FlatDataType[] | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewFile, setPreviewFile] = useState<FlatDataType | null>(null);

  const getNavigationTree: Action = {
    method: 'GET',
    endpoint: `/api/v1/tree-flat/${appContext.selectedFile?.id}`,
  };

  const { payload: fullItemList } = useQuery<FlatDataType[]>(getNavigationTree);

  useEffect(() => {
    if (searchTerm === '') {
      setItems(fullItemList);
    } else {
      setItems(
        fullItemList?.filter((item) =>
          item.name.toLowerCase().startsWith(searchTerm)
        )
      );
    }
  }, [fullItemList, searchTerm]);

  const setIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Circle-icons-folder.svg"
            alt=""
          />
        );
      case 'image':
        return (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
            alt=""
          />
        );
      case 'doc':
        return (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Circle-icons-document.svg"
            alt=""
          />
        );
      default:
        return null;
    }
  };

  const TextPreview = (preview: boolean) => {
    const sx = preview
      ? {
          zIndex: '11',
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: '0',
          right: '0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '300px',
          width: '300px',
          margin: 'auto',
          backgroundColor: '#D3D3D3',
          borderRadius: '15px',
        }
      : { padding: '20px' };

    return (
      <Box sx={[sx]}>
        <Typography variant="h2" component="h2">
          Preview
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Name"
              secondary={
                preview ? previewFile?.name : appContext.selectedFile?.name
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="type"
              secondary={
                preview ? previewFile?.type : appContext.selectedFile?.name
              }
            />
          </ListItem>
        </List>
      </Box>
    );
  };

  if (!appContext.selectedFile) {
    return null;
  }

  return (
    <Container>
      {appContext.selectedFile?.type === 'folder' ? (
        <>
          <SearchDiv>
            <SearchInput
              onChange={(event) => {
                setSearchTerm(event.target.value.toLowerCase());
              }}
              value={searchTerm}
              placeholder="Search Files"
              type="text"
            />
          </SearchDiv>
          <FilesList>
            {previewFile && (
              <EscapeScreen
                onClick={() => {
                  setPreviewFile(null);
                }}
              />
            )}
            {items?.map((item) => (
              <FileButton
                key={item.id}
                onClick={() => {
                  var expandedIds = [...appContext.expandedItemIds];
                  expandedIds.push(item.id);
                  appContext.setExpandedItemIds(expandedIds);

                  if (item.type === 'folder') {
                    appContext.setSelectedFile(item);
                    setSearchTerm('');
                  } else {
                    setPreviewFile(item);
                  }
                }}
              >
                {item.id === previewFile?.id && TextPreview(true)}
                <ItemView>
                  {setIcon(item.type)}
                  <FileText>{item.name}</FileText>
                </ItemView>
              </FileButton>
            ))}
          </FilesList>
        </>
      ) : (
        <>{TextPreview(false)}</>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow-y: scroll;
`;

const ItemView = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  object-fit: contain;
`;
const FileText = styled.h5`
  color: black;
  text-align: center;
`;

const EscapeScreen = styled.div`
  z-index: 10;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: -55px;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const FilesList = styled.div`
  position: relative;
  display: grid;
  padding: 10px;
  gap: 10px;
  grid-template-columns:
    minmax(125px, 1fr) minmax(125px, 1fr) minmax(125px, 1fr)
    minmax(125px, 1fr) minmax(125px, 1fr) minmax(125px, 1fr);
  @media (max-width: 1400px) {
    grid-template-columns:
      minmax(125px, 175px) minmax(125px, 175px) minmax(125px, 175px)
      minmax(125px, 175px) minmax(125px, 175px);
  }
  @media (max-width: 1200px) {
    grid-template-columns:
      minmax(125px, 175px) minmax(125px, 175px) minmax(125px, 175px)
      minmax(125px, 175px);
  }
  @media (max-width: 1000px) {
    grid-template-columns: minmax(125px, 175px) minmax(125px, 175px) minmax(
        125px,
        175px
      );
  }
`;

const FileButton = styled.div`
  padding: 2px;
  border-radius: 10px;
  div:hover {
    transition: 150ms transform ease-in;
    transform: scale(1.02);
  }
`;

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
  margin-top: 10px;
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
