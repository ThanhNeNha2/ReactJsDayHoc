import axios from "axios";
import React, { Component } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default class DeleteModal extends Component {
  componentDidMount() {}

  DeleteUser = async (id) => {
    try {
      let res = await axios.delete(`https://reqres.in/api/users/${id}`);

      console.log(res); // 2 viet sau
      if (res.status === 204) {
        toast.success("Delete thành công ");
        this.props.NewListUsers(id);
      } else {
        toast.error("Delete thất bại");
      }
      this.props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    // khi ấn vào nó mới có thông tin ở infoUser ( hỏi sem ai biết không )
    let { handleShow, handleClose, infoUser, NewListUsers } = this.props;
    // console.log(infoUser);

    return (
      <>
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắc muốn xóa người dùng với Email: <br />{" "}
            <b> {infoUser.email}</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => this.DeleteUser(infoUser.id)}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
