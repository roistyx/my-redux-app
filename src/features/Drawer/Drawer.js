import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer } from "./drawerSlice";
// import MenuIcon from "@mui/icons-material/Menu";
import MenuIcon from "../../elements/MenuIcon.js";
import "./Drawer.css";

function Drawer({ links }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const overlayRef = useRef(null);
  console.log(links);

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      dispatch(closeDrawer());
    }
  };

  // Focus the overlay when it opens so it can capture keyboard events.
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    if (isOpen) {
      dispatch(closeDrawer());
    } else {
      dispatch(openDrawer());
    }
  };

  return (
    <>
      <div className="icon-container" onClick={toggleDrawer}>
        <MenuIcon />
      </div>
      {/* <button onClick={toggleDrawer}>
        {isOpen ? "Close Drawer" : "Open Drawer"}
      </button> */}

      {isOpen && (
        <div
          tabIndex={0}
          ref={overlayRef}
          className="drawer-overlay"
          onKeyUp={handleEscape}
          onClick={() => dispatch(closeDrawer())}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            {links.map((item) => (
              <div className="drawer-item">
                <a className="menu-link" href={item.link}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Drawer;
