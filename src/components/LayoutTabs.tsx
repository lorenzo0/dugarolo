import './LayoutTabs.css';

interface ContainerProps {
  name: string;
}

const LayoutTabs: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <div className="top_div"/>
      <div className="bottom_div"/>
    </div>
  );
};

export default LayoutTabs;
