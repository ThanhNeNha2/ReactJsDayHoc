import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";

export default class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    setTimeout(async () => {
      try {
        let res = await axios.get(`https://reqres.in/api/users?page=1`);

        this.setState({
          users: res.data.data,
          isLoading: false,
          // giả vờ res.total_pages rồi hỏi
          totalPages: res.data.total_pages,
        });
      } catch (error) {
        this.setState({
          error: error,
          isLoading: false,
        });
      }
    }, 10);
  }

  handleDelete = () => {
    toast.error("lỗi rôi nha ");
  };

  render() {
    return (
      <div>
        <Table striped bordered hover variant="white">
          <thead>
            <tr>
              <th>#Id</th>
              <th>Name</th>
              <th>Length</th>
              <th>Gmail</th>
              <th>Avata</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <img
                      src={item.avatar}
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          photoIndex: item.avatar,
                        })
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => {
                        this.handleDelete();
                      }}
                      className="btn btn-success"
                    >
                      Delete
                    </button>{" "}
                    <Button variant="warning">Update</Button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
