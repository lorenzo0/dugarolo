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
  let ltnlng = {lat:44.7016081, long:10.5682283};
  function activeMap(newPosition){
    console.log(newPosition);
    return(
      <MapView position={newPosition}/>
    )
  } 
  
  return (
    <div className="container">
      <div className="top_div">
        {activeMap(ltnlng)}
      </div>
      <div className="bottom_div">
        <AssetLoader name={name} map={activeMap} />
      </div>
    </div>
  );
};

export default LayoutTabs;
