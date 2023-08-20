import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
   Add Your Image <input type="file" />
    </div>
  );
};

export default ExploreContainer;
