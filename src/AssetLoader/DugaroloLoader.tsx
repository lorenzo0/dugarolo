import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const fakeDugaroli = [
  { id: 0, name: 'Dugarolo1' },
  { id: 1, name: 'Dugarolo2' },
  { id: 3, name: 'Dugarolo3' },
  { id: 4, name: 'Dugarolo4' },
  { id: 5, name: 'Dugarolo5' },
  { id: 6, name: 'Dugarolo6' },
];

interface ContainerProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function DugaroloLoader({ onClick }: ContainerProps): any {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dugaroloList, setDugaroloList] = useState([]);

  return fakeDugaroli.map(item => <MenuItem onClick={onClick}>{item.name}</MenuItem>);

  /*useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(json => setDugaroloList(json))
          .then(() => setIsLoaded(true));
      }, [isLoaded]);

    return(
        isLoaded ? ( 
            dugaroloList.map(item => 
                <MenuItem onClick={onClick}>item.name</MenuItem> 
            )
        ) : []
    )*/
}
