import Alert from '@mui/material/Alert';
import { Action, useQuery } from 'react-fetching-library';
import LinearProgress from '@mui/material/LinearProgress';
import TreeItem from '@mui/lab/TreeItem';
import { FlatDataType } from '../../types/types';
import { NavigationItem } from './NavigationItem';
import { AppContext } from '../AppContext';
import { useContext, useEffect, useState } from 'react';

export const NavigationItems = ({ itemId }: { itemId: string }) => {
  const appContext = useContext(AppContext);
  const [searchedItems, setSearcheditems] = useState<FlatDataType[] | null>(
    null
  );
  const getNavigationTree: Action = {
    method: 'GET',
    endpoint: `/api/v1/tree-flat/${itemId}`,
  };

  const {
    payload: items,
    loading,
    error,
  } = useQuery<FlatDataType[]>(getNavigationTree);

  useEffect(() => {
    if (items) {
      appContext.setSubFiles(items);
      if (appContext.searchTerm == null || appContext.searchTerm === '') {
        setSearcheditems(null);
      } else {
        const searchedItems = items.filter((item) =>
          item.name.toLowerCase().startsWith(appContext.searchTerm ?? '')
        );
        setSearcheditems(searchedItems);
      }
    }
  }, [appContext, items]);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Alert severity="error">Failed to load!</Alert>;
  }

  return (
    <>
      {searchedItems ? (
        <>
          {searchedItems?.map((item) => {
            return <NavigationItem key={item.id} item={item} />;
          })}
        </>
      ) : (
        <>
          {items?.map((item) => {
            return <NavigationItem key={item.id} item={item} />;
          })}
        </>
      )}
      {!items?.length && (
        <TreeItem
          nodeId={itemId + 'no-content'}
          label={'No Content'}
          disabled
        />
      )}
    </>
  );
};
