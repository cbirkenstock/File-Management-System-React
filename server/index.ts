import express from 'express';
import path from 'path';

import fs from 'fs';
import { ApiResponse, TreeLeafType, FlatDataType } from '../types/types';

const app = express();

const pathToData = path.resolve(__dirname, './data/data.json');
const treeResponse = fs.readFileSync(pathToData, { encoding: 'utf8' });
const data = JSON.parse(treeResponse) as ApiResponse;

const flatData: FlatDataType[] = [];

// const getChildrenInfo = (item: TreeLeafType) => {};

const constructFlatData = (items: TreeLeafType[], parentId: string | null) => {
  items.forEach((item) => {
    const { children, ...itemData } = item;
    if (children) {
      constructFlatData(children, item.id);
    }
    flatData.push({ ...itemData, parentId, hasChildren: !!children?.length });
  });
};

constructFlatData(data.response, null);

app.get('/api/v1/tree', (_, res) => {
  setTimeout(() => {
    res.json(data);
  }, 300);
});

const sortNavigationItems = (
  itemA: FlatDataType,
  itemB: FlatDataType
): number => {
  if (itemA.type === 'folder' && itemB.type !== 'folder') {
    return -1;
  } else if (itemB.type === 'folder' && itemA.type !== 'folder') {
    return 1;
  } else if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
    return -1;
  } else if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
    return 1;
  }

  return 0;
};

app.get(['/api/v1/tree-flat', '/api/v1/tree-flat/:parentId'], (req, res) => {
  const parentId = req.params.parentId || null;
  const treeData = flatData
    .filter((item) => item.parentId === parentId)
    .sort(sortNavigationItems);

  setTimeout(() => {
    res.json(treeData);
  }, 300);
});

app.listen(3001, () => {
  console.log('API server running on localhost:3001');
});
