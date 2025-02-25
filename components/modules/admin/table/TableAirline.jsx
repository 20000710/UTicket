import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreate from "../modal/CreateModalBooking";
import ModalUpdate from "../modal/ModalEditBooking";
import Swal from "sweetalert2";

export default function Table() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(
      "https://uticket-v2-be.vercel.app/api/v1/airlines"
    );
    setUser(response.data.data);
  };

  console.log(users);
  const deleteProduct = async () => {
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
          .delete(`https://uticket-v2-be.vercel.app/api/v1/airlines/`)
          .then(() => {
            fetch();
            // dispatch(deleteProduct(res));
            // navigate('/product')
            Swal.fire("Deleted!", "Product Delete Success!", "success");
            // console.log(res);
            // setShow(false);
          })
          .catch(() => {
            Swal.fire("Failed!", "Product Delete Failed!", "error");
            // setShow(false);
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
              <h1>Airline List</h1>
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
                  <ModalCreate />
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Support</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.description}</td>
                          <td>{user.support}</td>
                          <td>
                            <ModalUpdate />
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
