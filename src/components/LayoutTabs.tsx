import './LayoutTabs.css';
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import AssetLoader from '../AssetLoader/CardLoader'
import MapView, { onClick } from './map/map'
import FlyToButton from './map/map'
import {useState} from 'react';

interface ContainerProps {
  name: string;
}

const LayoutTabs:React.FC<ContainerProps> = ({ name }) => {

  function moveMap(newPosition){
    onClick(newPosition);
  }
  
  return (
    <div className="container">
      <div className="top_div">
        <MapView />
      </div>
      <div className="bottom_div">
        <AssetLoader name={name} map={moveMap} />
      </div>
    </div>
  );
};

export default LayoutTabs;
