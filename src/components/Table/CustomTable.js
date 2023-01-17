import React from "react";
import { FaSort } from "react-icons/fa";
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    if (!items) return;
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const CustomTable = ({ products, childTablePageSize, handlePageNoClick, activePage }) => {
  // const [activePage, setActivePage] = useState(1);
  const { items, requestSort, sortConfig } = useSortableData(products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleClickPage = (pageNo) => {
    handlePageNoClick(pageNo);
  };

  return (
    <>
     
        { products?.length > 0 && (
          <>
           <div className={`${products?.length > 5 ? "table-container" : ""}`}>
            <table className="table bordered table-bordered text-center custom-table">
              <thead>
              
                <tr>
                  {Object.keys(products[0])
                    .filter((item) => item !== "id")
                    .map((item, id) => (
                      <th
                        key={id}
                        onClick={() => requestSort(item)}
                        className={` ${getClassNamesFor(item)}`}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                        <FaSort className="ms-2 cursor-pointer" opacity={0.2} />
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {items.map((items) => (
                  <tr key={items?.id}>
                    {Object.keys(products[0])
                      .filter((item) => item !== "id")
                      .map((item, index) => (
                        <td>{items[item]}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
     

      {childTablePageSize > 1 && (
        <div className="pagination">
          {Array.from({ length: childTablePageSize }).map((item, index) => (
            <button className={`${activePage === index + 1 ? "active" : ""}`} onClick={() => handleClickPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomTable;
