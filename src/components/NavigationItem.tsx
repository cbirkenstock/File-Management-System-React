import { useContext } from 'react';
import Image from '@mui/icons-material/ImageOutlined';
import InsertDriveFile from '@mui/icons-material/InsertDriveFileOutlined';
import TreeItem from '@mui/lab/TreeItem';

import { FlatDataType } from '../../types/types';
import { AppContext } from '../AppContext';
import { NavigationItems } from './NavigationItems';

export const NavigationItem = ({ item }: { item: FlatDataType }) => {
  const appContext = useContext(AppContext);
  let icon = null;

  switch (item.type) {
    case 'doc':
      icon = <InsertDriveFile />;
      break;
    case 'image':
      icon = <Image />;
      break;
  }

  return (
    <TreeItem
      nodeId={item.id}
      label={item.name}
      icon={icon}
      onClick={() => {
        if (appContext.expandedItemIds.includes(item.id)) {
          appContext.setExpandedItemIds(
            appContext.expandedItemIds.filter((id) => id !== item.id)
          );
          appContext.setSelectedFile(null);
        } else {
          var expandedIds = [...appContext.expandedItemIds];
          expandedIds.push(item.id);
          appContext.setExpandedItemIds(expandedIds);
          appContext.setSelectedFile(item);
          appContext.setSearchTerm('');
        }
      }}
    >
      {item.type === 'folder' && <NavigationItems itemId={item.id} />}
    </TreeItem>
  );
};
