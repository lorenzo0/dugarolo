import './LayoutTabs.css';
import ListRequest from './util/ListRequest';
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
//import ScrollView from 'react-native';

interface ContainerProps {
  name: string;
}
//Today

//Bottom div is moving 'cause the scrolling list, have to find a view
const LayoutTabs:React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <div className="top_div"/>
      <div className="bottom_div">
         <ListRequest name={name} />
      </div>
    </div>
  );
};

export default LayoutTabs;
