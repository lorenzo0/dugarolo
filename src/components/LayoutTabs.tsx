import './LayoutTabs.css';
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import AssetLoader from '../AssetLoader/CardLoader'
import MapView from './map/map'
import {useState} from 'react';

interface ContainerProps {
  name: string;
}


const LayoutTabs:React.FC<ContainerProps> = ({ name }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  
  return (
    <div className="container">
      <div className="top_div">
        <MapView />
      </div>
      <div className="bottom_div">
        <AssetLoader name={name} />
      </div>
    </div>
  );
};

export default LayoutTabs;
