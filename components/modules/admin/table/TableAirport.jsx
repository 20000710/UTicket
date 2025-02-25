import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditBooking from "../modal/ModalEditBooking";
import ModalCreateBooking from "../modal/CreateModalBooking";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function TableAirport() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(
      "https://uticket-v2-be.vercel.app/api/v1/airport"
    );
    setUser(response.data.data);
  };
  const deleteProduct = async (id) => {
    const ID = users[id].id;
    const token = Cookies.get("token");
    Swal.fire({
      title: "Sure to Delete This Product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`https://uticket-v2-be.vercel.app/api/v1/airport/${ID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            fetch();
            Swal.fire("Deleted!", "Product Delete Success!", "success");
            console.log(res);
          })
          .catch((err) => {
            Swal.fire("Failed!", "Product Delete Failed!", "error");
            console.log(err);
          });
      }
    });
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Airport List</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-end">
                  <ModalCreateBooking />
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>City</th>
                        <th>Country</th>
                        <th>Country Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{user.city}</td>
                          <td>{user.country}</td>
                          <td>{user.country_code}</td>
                          <td>
                            <ModalEditBooking />
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteProduct(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
