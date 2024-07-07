import Header from "./Components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TableUser from "./Components/Content/TableUser.1";
import CreateUser from "./Components/CreateUser/CreateUser";
function App() {
  // return (

  // );
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="App">
          <header className="App-header">
            <Header />
            <TableUser />
          </header>
        </div>
      ),
    },
    {
      path: "/create",
      element: <CreateUser />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </>
  );
}

export default App;
