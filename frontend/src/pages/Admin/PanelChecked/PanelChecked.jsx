import AdminChecked from "../../../components/AdminContainer/AdminChecked";
import Filter from "../../../components/Filter/Filter";

const PanelChecked = () => {
  return (
    <>
      <h1 className="main-header">База данных</h1>
      <Filter />
      <AdminChecked />
    </>
  );
};

export default PanelChecked;
