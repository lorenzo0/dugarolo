import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const fakeDugaroli = [
  { id: 1, name: 'Dugarolo1' },
  { id: 2, name: 'Dugarolo2' },
  { id: 3, name: 'Dugarolo3' },
  { id: 4, name: 'Dugarolo4' },
  { id: 5, name: 'Dugarolo5' },
  { id: 6, name: 'Dugarolo6' },
  { id: 7, name: 'All'}
];

interface ContainerProps {
  onClick: (id: number) => void;
}

export default function DugaroloLoader({ onClick }: ContainerProps): any {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dugaroloList, setDugaroloList] = useState([]);

  return fakeDugaroli.map(item => (
    <MenuItem onClick={() => onClick(item.id)}>{item.name}</MenuItem>
  ));
}
