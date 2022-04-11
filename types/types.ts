type FolderLeafType = {
  id: string;
  type: 'folder';
  name: string;
  children: TreeLeafType[];
};

export type FileLeaftType = {
  id: string;
  type: 'image' | 'doc';
  name: string;
  children?: undefined;
};

export type FlatDataType = Omit<TreeLeafType, 'children'> & {
  parentId: string | null;
  hasChildren: boolean;
};

export type TreeLeafType = FolderLeafType | FileLeaftType;

export type ApiResponse = { response: TreeLeafType[] };
