
import Filter from '../../components/Filter/Filter';
import Gallery from '../../components/Gallery/Gallery';
import './index.css';


const Home = () => {
  return (
    <>
      <h1 className="main-header">Выпускники школы</h1>
      <Filter />
      <Gallery />
    </>
  );
};


export default Home;
