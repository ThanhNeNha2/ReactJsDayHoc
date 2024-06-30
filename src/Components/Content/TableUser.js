import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import "../../App.scss";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ReactPaginate from "react-paginate";
export default class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null,
      photoIndex: "",
      isOpen: false,
      totalPages: 0,
    };
  }

  async componentDidMount() {
    this.getAllUser(1);
  }

  getAllUser = (value) => {
    setTimeout(async () => {
      try {
        let res = await axios.get(`https://reqres.in/api/users?page=${value}`);

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
  };
  handleDelete = () => {
    toast.error("lỗi rôi nha ");
  };
  handlePageClick = (event) => {
    this.getAllUser(event.selected + 1);
  };
  render() {
    const { photoIndex, isOpen } = this.state;
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
              })
            )}
          </tbody>
        </Table>

        {isOpen && (
          <Lightbox
            mainSrc={photoIndex}
            nextSrc={photoIndex}
            prevSrc={photoIndex}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => {}}
            onMoveNextRequest={() => {}}
          />
        )}
        <ReactPaginate
          nextLabel="next >"
          // thya doi trang
          onPageChange={this.handlePageClick}
          //pham vi cac trang hien thi
          pageRangeDisplayed={2}
          // so trang hien thi cho le
          marginPagesDisplayed={2}
          // so trang
          pageCount={this.state.totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }
}
