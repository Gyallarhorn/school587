import Filter from '../../../components/Filter/Filter';
import AdminNew from '../../../components/AdminContainer/AdminNew';

const PanelNew = () => {
  return (
    <div>
      <>
        <h1 className="main-header">База данных</h1>
        <Filter />
        <AdminNew />
      </>
    </div>
  );
};

export default PanelNew;
