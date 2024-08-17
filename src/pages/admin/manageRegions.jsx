import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "@/components/ui/heading";
import React, { useEffect, useState } from "react";
import map from "../../assets/mapMOH.png";
import TableSearch from "@/components/TableSearch";
import RegionAddPopup from "@/components/RegionsAddPopup";
import { useTitle } from "@/hooks/useTitle";
import RegionService from "@/service/regionService";
import { errorType, Toast } from "@/components/toast";

const columns = [
  {
    field: "regionId",
    headerName: "Region ID",
    width: 90,
    headerClassName: "bold",
  },
  // {
  //   field: "number",
  //   headerName: "Region Number",
  //   flex: 1,
  // },
  {
    field: "regionName",
    headerName: "Region Name",
    flex: 1,
  },
  {
    field: "midwife",
    headerName: "Midwife",
    flex: 1,
  },
  {
    field: "population",
    headerName: "Population",
    flex: 1,
  },
];

const manageRegions = () => {
  useTitle("Regions");
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await RegionService.getRegions();
        setRows(response);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchRegions();
  }, [isOpen]);

  return (
    <div className="content-container">
      <Heading title={"Manage Divisions"} />

      <RegionAddPopup
        addButton={"Add New Region"}
        regionName={"Region Name"}
        population={"Population"}
        midwife={"Assign Midwife"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex flex-col items-end">
        <div className="w-full f-full mb-12">
          <StripedDataGrid
            getRowId={(row) => row.regionId}
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 15]}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            disableRowSelectionOnClick
            slots={{ toolbar: TableSearch }}
          ></StripedDataGrid>
        </div>
      </div>
      <div>
        <img src={map} alt="" />
      </div>
    </div>
  );
};

export default manageRegions;
