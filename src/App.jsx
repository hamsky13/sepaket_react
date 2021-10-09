import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/MyNavbar";
import ViewProductsAdmin from "./pages/ViewProductsAdmin";

import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    // if (this.props.userGlobal.storageIsChecked) {
    return (
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={ViewProductsAdmin} path="/admin/viewproducts" />
          <Route component={Admin} path="/admin" />
          <Route component={Register} path="/register" />
          <Route component={Profile} path="/profile" />
          <Route component={Cart} path="/cart" />
          <Route component={History} path="/history" />
          <Route component={ProductDetail} path="/productDetail/:productId" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    );
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
