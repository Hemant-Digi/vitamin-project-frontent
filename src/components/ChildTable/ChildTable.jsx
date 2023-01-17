import React, { useEffect, useState } from "react";
import CustomTable from "../Table/CustomTable";

const ChildTable = ({ childTableData, childTabData, handleChildTabActive, childTablePageSize, handlePageNoClick, searchedData, childActiveTab, activePage }) => {
  // const [activeTab, setActiveTab] = useState({ tab_child_id: "", index: 0 });

  const handleTabClick = (index, item) => {
    // setActiveTab({ tab_child_id: item?.tab_child_id, index });
    handleChildTabActive(item, index);
  };

 

  return (
    <>
      <div className="right-vitamin">
        <button className="btn raw-btn w-100" type="button">
          Raw Data
        </button>

        <nav className="zones_active">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {childTabData.map((item, index) => {
              return (
                <button
                  className={`nav-link ${
                    childActiveTab.index === index ? "active" : ""
                  }`}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={() => handleTabClick(index, item)}
                >
                  {item.display_name}
                </button>
              );
            })}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <CustomTable products={childTableData} childTablePageSize={childTablePageSize} handlePageNoClick={handlePageNoClick} activePage={activePage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildTable;
