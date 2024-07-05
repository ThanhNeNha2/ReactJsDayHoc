import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import "./TableUser.scss";
import DeleteModal from "../Modal/DeleteModal";
export default class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: false,
      isShowModal: false,
      userDelete: {},
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      try {
        let res = await axios.get(`https://reqres.in/api/users?page=1`);
        this.setState({
          users: res.data.data,
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
        this.setState({
          error: true,
          isLoading: false,
        });
      }
    }, 500);
  }

  // phân xóa người dùng
  handleDelete = (item) => {
    this.setState({
      isShowModal: true,
      userDelete: item,
    });
  };
  handleClose = () => {
    this.setState({
      isShowModal: false,
    });
  };
  NewListUsers = (userDelete) => {
    let newUser = this.state.users;
    delete newUser[userDelete - 1];
    this.setState({
      users: newUser,
    });
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
            {this.state.error ? (
              "data is error "
            ) : this.state.isLoading === true ? (
              <div className="hihi">
                <FadeLoader
                  loading={true}
                  color="#2bf401"
                  margin={2}
                  height={15}
                  width={5}
                  radius={2}
                />{" "}
              </div>
            ) : (
              <>
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
                            this.handleDelete(item);
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
              </>
            )}
          </tbody>
        </Table>
        <DeleteModal
          handleShow={this.state.isShowModal}
          handleClose={this.handleClose}
          infoUser={this.state.userDelete}
          NewListUsers={this.NewListUsers}
        />
      </div>
    );
  }
}
