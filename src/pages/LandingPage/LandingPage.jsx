import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import Vitamin from "../../assets/images/DBV.png";
import NoDataFound from "../../assets/images/No-data-found.jpeg";

import ChildTable from "../../components/ChildTable/ChildTable";
import _ from "lodash";
import {
  fetchSearchData,
  fetchTabChild,
  fetchTabChildTableData,
  fetchTabData,
} from "./LandingPage.api";
import { Blocks } from "react-loader-spinner";

const LandingPage = (props) => {
  const [loader, setLoader] = useState(true);
  const [fullScreenRightSection, setFullScreenRightSection] = useState(true);
  const [fullscreenLeftSection, setFullscreenLeftSection] = useState(true);

  const [searchedData, setSearchedData] = useState("");
  const [parentTabData, setParentTabData] = useState([]); // will stored parent tab API response
  const [parentActiveTab, setActiveParentTab] = useState({tab_id : "", index : 0}); // will stored active parent tab
  const [childActiveTab, setChildActiveTab] = useState({ tab_child_id: "", index: 0 }); // will stored active parent tab
  const [childTabData, setChildTabData] = useState([]); // will stored child tab API response
  const [childTableData, setChildTableData] = useState([]); // will stored child tab table API response
  const [childTablePageSize, setChildTablePageSize] = useState(); // will stored child tab table API response
  const [activePage, setActivePage] = useState(1); // will stored child tab table API response


  const handleSearchData = async (e) => {
    setSearchedData(e.target.value);
  };

  const handleClickSearch = async () => {
    setLoader(true);
    if (!searchedData){
      fetchTabDataList();
      setChildActiveTab({...childActiveTab, index:0})
      setActivePage(1)
    } else{
      const resSearchData = await fetchSearchData(searchedData);
      setChildTableData(resSearchData.zones);
      setChildTablePageSize(0);
      setChildActiveTab({...childActiveTab, index:0})
      setLoader(false);
    }
  };

  const setZoneIdColFirst = (data) => {
    let sortData = []
    if(data && Object.keys(data[0]).includes('ZoneID')){
      sortData =  data.map(item => {
        return {
          ZoneID : item.ZoneID ,...item
        }
       })
    }
    return sortData?.length ? sortData : data;
  }

  const fetchTabDataList = async () => {
    setLoader(true);
    const resParentTab = await fetchTabData();
    setParentTabData(resParentTab?.data);
    if (!_.isEmpty(resParentTab?.data)) {
      setActiveParentTab({tab_id:resParentTab?.data[0].tab_id, index: 0});
      const resChildTab = await fetchTabChild(resParentTab?.data[0]?.tab_id);
      const resChildTableData = await fetchTabChildTableData(
        resParentTab?.data[0]?.tab_id,
        resChildTab?.data[0]?.tab_child_id,
        1
      );
      setChildTablePageSize(resChildTableData.page_size);
      const value  = setZoneIdColFirst(resChildTableData.data || [])
      setChildTableData(value || []);
      setChildTabData(resChildTab.data || []);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTabDataList();
  }, []);

  const handleParentTabActive = async (value, index) => {
    setLoader(true);
    setActiveParentTab({tab_id:value?.tab_id, index});
    const resChildTab = await fetchTabChild(value?.tab_id);
    if (!resChildTab.data) {
      setChildTableData([]);
      setChildTabData([]);
      setLoader(false);
    } else {
      const resChildTableData = await fetchTabChildTableData(
        value?.tab_id,
        resChildTab.data[0]?.tab_child_id,
        1
      );
      setChildActiveTab({tab_child_id:resChildTab.data[0]?.tab_child_id, index: 0});
      setChildTablePageSize(resChildTableData.page_size);
      const values  = setZoneIdColFirst(resChildTableData.data || [])
      setChildTableData(values || []);
      setChildTabData(resChildTab.data);
      setLoader(false);
    }
  };

  const handleChildTabActive = async (value, index) => {
    const resChildTableData = await fetchTabChildTableData(
      parentActiveTab.tab_id,
      value.tab_child_id,
      1
    );
    setActivePage(1)
    setChildActiveTab({tab_child_id:value.tab_child_id, index });
    setChildTablePageSize(resChildTableData.page_size);
    const values  = setZoneIdColFirst(resChildTableData.data || [])
    setChildTableData(values || []);
  };

  const handlePageNoClick = async (pageNo) => {
    setLoader(true);
    setActivePage(pageNo);
    const resChildTableData = await fetchTabChildTableData(
      parentActiveTab.tab_id,
      childActiveTab.tab_child_id,
      pageNo
    );
    setChildTablePageSize(resChildTableData.page_size);
    const value  = setZoneIdColFirst(resChildTableData.data || [])
    setChildTableData(value || []);
    setLoader(false);
  };

  return (
    <>
      <div className="top">
        <Header />
        <Tabs
        parentActiveTab={parentActiveTab}
          parentTabData={parentTabData}
          handleParentTabActive={handleParentTabActive}
        />
      </div>
      <div className="container-fluid" id="VitaminD-Body">
        <div className="container">
          <div className="row">
            {fullscreenLeftSection && (
              <div
                className={` left-vitamin-box col-md-6 ${
                  fullScreenRightSection ? "" : " mx-auto"
                }`}
              >
                <div className="icon_backgroud">
                  <i
                    className={
                      fullScreenRightSection
                        ? "fas fa-expand"
                        : "fas fa-compress"
                    }
                    onClick={() =>
                      setFullScreenRightSection(!fullScreenRightSection)
                    }
                  ></i>
                </div>
                <div className="left-vitamin">
                  <div className="input-group suggestionInput">
                    <input
                      className="form-control border-end-0 border"
                      onChange={handleSearchData}
                      type="Search"
                      value={searchedData}
                      id="example-Search-input"
                      placeholder="Enter zip code"
                    />

                    <span className="input-group-append">
                      <button
                        className="btn search-btn border-start-0 border ms-n5 "
                        type="submit"
                        onClick={handleClickSearch}
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </span>
                  </div>
                  <div className="vitamin-img">
                    <img alt="vitamin" className="VidatminD-image img-fluid" src={Vitamin} />
                  </div>
                </div>
              </div>
            )}
            {fullScreenRightSection && (
              <div
                className={` right-vitamin-box col-md-6 ${
                  fullscreenLeftSection ? "" : " mx-auto"
                }`}
              >
                {loader ? (
                  <>
                  <div className="loader-container">
                  <Blocks
                      // visible={loader ? true : false}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                    />
                  </div>
             
                  </>
                ) : childTableData?.length > 0 ? (
                  <>
                    {" "}
                    <div className="icon_backgroud">
                      <i
                        className={
                          fullscreenLeftSection
                            ? "fas fa-expand"
                            : "fas fa-compress"
                        }
                        onClick={() =>
                          setFullscreenLeftSection(!fullscreenLeftSection)
                        }
                      ></i>
                    </div>
                    {childTableData && childTabData && (
                      <ChildTable
                        childTableData={childTableData}
                        childTabData={childTabData}
                        handleChildTabActive={handleChildTabActive}
                        childTablePageSize={childTablePageSize}
                        handlePageNoClick={handlePageNoClick}
                        searchedData={searchedData}
                        childActiveTab={childActiveTab}
                        activePage={activePage}
                      />
                    )}
                  </>
                ) : (
                  <div className="no-result-found">
                    <img alt="no-data" className="no-result-found-image" src={NoDataFound} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
