import Sidebar from "../../components/modules/admin/sidebar/Sidebar";
import TableAirline from "../../components/modules/admin/table/TableAirline";

export default function adminPanel() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <TableAirline />
          </main>
        </div>
      </div>
    </>
  );
}
