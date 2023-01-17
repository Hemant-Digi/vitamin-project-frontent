import axios from "axios";

const BaseUrl = "http://foobar.in:8000/";

// API for fetching search data
export const fetchSearchData = async (zipCode) => {
  const { data } = await axios.get(`${BaseUrl + "search?zip=" + zipCode}`);
  return data;
};

// API for fetching tab data
export const fetchTabData = async () => {
  const { data } = await axios.get(`${BaseUrl + "tabs/listing/"}`);
  return data;
};

// API for fetching tab child data
export const fetchTabChild = async (parentTabId) => {
  const { data } = await axios.get(
    `${BaseUrl + "tabs/child/listing?tab_id=" + parentTabId}`
  );
  return data;
};

// API for fetching tab child data
export const fetchTabChildTableData = async (tab_id, tab_child_id, page_number) => {
  const { data } = await axios.get(
    `${
      BaseUrl +
      "tabs/child/data?tab_id=" +
      tab_id +
      "&tab_child_id=" +
      tab_child_id +
      "&page_number=" +
      page_number
    }`
  );
  return data;
};
