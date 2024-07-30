import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "@/components/ui/heading";
import React from "react";
import map from "../../assets/mapMOH.png";
import TableSearch from "@/components/TableSearch";
import RegionAddPopup from "@/components/RegionsAddPopup";

const columns = [
  {
    field: "id",
    headerName: "Division ID",
    width: 90,
    headerClassName: "bold",
  },
  {
    field: "number",
    headerName: "Division Number",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Division Name",
    flex: 1,
  },
  {
    field: "mohAreas",
    headerName: "MOH areas",
    flex: 1,
  },
  {
    field: "population",
    headerName: "Population",
    flex: 1,
  },
];

const rows = [
  {
    id: "D01",
    number: "08",
    name: "Piliyandala",
    mohAreas: "Udahamulla, Nawinna, Jambugasmulla",
    population: "200",
  },
  {
    id: "D02",
    number: "08",
    name: "Piliyandala",
    mohAreas: "Udahamulla, Nawinna, Jambugasmulla",
    population: "200",
  },
];

const manageDivisions = () => {
  return (
    <div className="content-container">
      <Heading title={"Manage Divisions"} />

      <RegionAddPopup />
      <div className="flex flex-col items-end">
        <div className="w-full f-full mb-12">
          <StripedDataGrid
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
            sx={{}}
          ></StripedDataGrid>
        </div>
      </div>
      <div>
        <img src={map} alt="" />
      </div>
    </div>
  );
};

export default manageDivisions;
