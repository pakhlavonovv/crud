import axios from "axios";
import { useEffect, useState } from "react";
import GlobalModal from "./components/modal";

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({});
 

  useEffect(() => {
    axios.get('http://localhost:3000/users').then(res => {
      setData(res?.data);
    });
  }, []);


  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3000/users/${id}`).then(() => {
        setData(prevData => prevData.filter(item => item.id !== id));
    }).catch(error => {
        console.error("error:", error);
    });
};


  return (
    <div className="container">
      <GlobalModal open={open} toggle={() => setOpen(false)} data={data} setData={setData} edit={edit} />
      <div className="row my-3">
        <div className="col-md-3 offset-1">
          <button className="btn btn-success" onClick={()=> setOpen(true)}>Open Modal</button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-10 offset-1">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>T/R</th>
                <th>Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.color}</td>
                    <td>{item.price}</td>
                    <td>{item.number}</td>
                    <td>
                      <button className="btn btn-primary mx-2" onClick={() => { setEdit(item); setOpen(true); }}>Edit</button>
                      <button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
