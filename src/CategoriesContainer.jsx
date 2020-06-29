import React from 'react';

import Categories from './Categories';

export default function CategoriesContainer() {
  const categories = [
    {
      id: 1,
      name: '한식',
    },
    {
      id: 2,
      name: '중식',
    },
    {
      id: 3,
      name: '일식',
    },
  ];

  return <Categories categories={categories} />;
}
