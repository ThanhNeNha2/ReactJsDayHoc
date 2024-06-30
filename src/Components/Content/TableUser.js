import React, { Component, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FadeLoader } from "react-spinners";

import "../../App.scss";
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
        let res = await axios.get("https://reqres.in/api/users?page=2");
        this.setState({
          users: res.data.data,
          isLoading: false,
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
    console.log("listUser ", this.state.users);
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
            {this.state.error ? (
              "data is error"
            ) : this.state.isLoading ? (
              <div className="check">
                <FadeLoader
                  color={"#3cb42d"}
                  loading={true}
                  height={15}
                  width={3}
                  radius={1}
                  margin={2}
                />
                Loading data .....
              </div>
            ) : (
              this.state.users.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <img src={item.avatar} />
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
              })
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
