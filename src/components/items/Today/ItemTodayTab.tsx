import './ItemTodayTab.css';

interface ItemProps {
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_irrigation: string;
}

const ItemTodayTab: React.FC<ItemProps> = ({ name, canal_name, farm_name, irrigation_time, duration_irrigation }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <strong>{canal_name}</strong>
      <strong>{farm_name}</strong>
      <strong>{irrigation_time}</strong>
      <strong>{duration_irrigation}</strong>
    </div>

  );
};


export default ItemTodayTab;