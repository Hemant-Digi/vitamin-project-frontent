import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Tabs = ({parentActiveTab, parentTabData, handleParentTabActive}) => {
  // const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index, item) => {
    // setActiveTab(index);
    handleParentTabActive(item, index);
  };

  return (
    <>
      <header className="p-1">
        <div className="container">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 menu">
            {parentTabData?.map((item, index) => {
              return (
                <li onClick={() => handleTabClick(index, item)}>
                  <a
                    // href="#"
                    className={`nav-link px-2 ${
                      parentActiveTab.index == index ? "active" : ""
                    }`}
                  >
                    {item.display_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
};

Tabs.propTypes = {};

export default Tabs;
