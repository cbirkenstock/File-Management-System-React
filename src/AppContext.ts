import { createContext } from 'react';

import { FlatDataType } from '../types/types';

export const defaultFile: FlatDataType = {
  hasChildren: true,
  id: 'a93b512c-7eec-4f31-8c5d-30f2b055e0b4',
  name: 'Account Frozen payment Kansas',
  parentId: null,
  type: 'folder',
};

export const AppContext = createContext<{
  selectedFile: FlatDataType | null;
  setSelectedFile: (payload: FlatDataType | null) => void;
  subFiles: FlatDataType[];
  setSubFiles: (payload: FlatDataType[]) => void;
  searchTerm: string | null;
  setSearchTerm: (payload: string) => void;
  expandedItemIds: string[];
  setExpandedItemIds: (payload: string[]) => void;
}>({
  selectedFile: defaultFile,
  setSelectedFile: () => {},
  searchTerm: null,
  subFiles: [],
  setSubFiles: () => {},
  setSearchTerm: () => {},
  expandedItemIds: [defaultFile.id],
  setExpandedItemIds: () => {},
});
