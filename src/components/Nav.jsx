import React, { useEffect, useState } from "react";
import flowernav from "../assets/icons/flowernav.svg";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo.svg";
import { ReactComponent as Menu2 } from "../assets/icons/menu2.svg";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import PopAvatar from "./PopAvatar";

function Nav() {
  const { id, avatar, fname } = useSelector((state) => state.User);
  const [width, setWidth] = useState(0);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let noAVatar = "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif";

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setWidth(window.innerWidth);
    });
  }, []);

  const routeTo = (to) => {
    setShow(false);
    navigate(to);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        location.replace("/login");
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  };
  return width > 700 ? (
    <nav>
      <Link to="/" className="molhem_logo">
        <img id="logo" src={Logo} alt="molhem logo" />
        <div>
          <span>ملهــم </span>
        </div>
      </Link>
      <div className="menu">
        <Link className="header_elements" to="/">
          <span>الصفحة الرئيسية</span>
        </Link>
        <Link className="header_elements" to={id ? "/AddBook" : "/login"}>
          <span>أعط كتاب</span>
        </Link>
        <Link className="header_elements" to="/books">
          <span>ابحث عن كتب</span>
        </Link>
        <Link className="header_elements" to="/">
          <span>من نحن؟</span>
        </Link>
        {!id && (
          <Link className="header_elements" to="/login">
            <span>سجل دخول</span>
          </Link>
        )}
      </div>

      {id ? (
        <PopAvatar avatar={avatar} />
      ) : (
        <Link to="/signup" className="register_button">
          <img id="logo" src={flowernav} alt="molhem logo" />
          <div className="cewnter_title_register">
            <span>أنشئ حساب</span>
          </div>
        </Link>
      )}
    </nav>
  ) : (
    <nav>
      <Link to="/" className="molhem_logo">
        <img id="logo" src={Logo} alt="molhem logo" />
        <div>
          <span>ملهــم </span>
        </div>
      </Link>
      <div onClick={() => setShow(true)}>
        {id ? (
          <div className="bowl_avatar_nav">
            <img src={avatar || noAVatar} alt="" />
          </div>
        ) : (
          <Menu2 className="menu_toggle" />
        )}
      </div>

      {show ? (
        <div className="pop_menu">
          <div className="content_pop_menu">
            {id ? (
              <div
                onClick={() => routeTo("/profile")}
                style={{ "--i": "1" }}
                className="profile_mode_line">
                <span>{fname}</span>
                <img src={avatar} alt="avatar" />
              </div>
            ) : (
              <div onClick={() => routeTo("/signup")} className="register_button">
                <img id="logo" src={flowernav} alt="molhem logo" />
                <div className="cewnter_title_register">
                  <span>أنشئ حساب</span>
                </div>
              </div>
            )}

            <div style={{ "--i": "2" }} className="profile_mode_line" onClick={() => routeTo("/")}>
              <span>الصفحة الرئيسية</span>
            </div>
            <div
              style={{ "--i": "3" }}
              className="profile_mode_line"
              onClick={id ? () => routeTo("/AddBook") : () => routeTo("/login")}>
              <span>أعط كتاب</span>
            </div>
            <div
              style={{ "--i": "4" }}
              className="profile_mode_line"
              onClick={() => routeTo("/books")}>
              <span>ابحث عن كتب</span>
            </div>

            <div style={{ "--i": "5" }} className="profile_mode_line" onClick={() => routeTo("/")}>
              <span>من نحن؟</span>
            </div>
            {id ? (
              <div style={{ "--i": "6" }} className="profile_mode_line" onClick={logout}>
                <span> تسجيل الخروج </span>
              </div>
            ) : (
              <div
                style={{ "--i": "6" }}
                className="profile_mode_line"
                onClick={() => routeTo("/login")}>
                <span>سجل دخول</span>
              </div>
            )}

            <div onClick={() => setShow(false)} className="close_pop_menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M10.05 23.95a1 1 0 0 0 1.414 0L17 18.414l5.536 5.536a1 1 0 0 0 1.414-1.414L18.414 17l5.536-5.536a1 1 0 0 0-1.414-1.414L17 15.586l-5.536-5.536a1 1 0 0 0-1.414 1.414L15.586 17l-5.536 5.536a1 1 0 0 0 0 1.414z" />
              </svg>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Nav;
