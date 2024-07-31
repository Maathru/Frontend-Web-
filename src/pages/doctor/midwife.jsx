import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import Heading from "@/components/ui/heading";
import React from "react";

const columns = [
  {
    field: "id",
    headerName: "Midwife ID",
    width: 130,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  { field: "region", headerName: "Region", flex: 1 },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
  },
  { field: "address", headerName: "Address", flex: 1 },
];

const rows = [
  {
    id: "MD05",
    name: "Saumya Sewwandi",
    region: "kolamunna",
    phone: "0703012938",
    address: "22/96, Artigala Road, Piliyandala",
  },
  {
    id: "MD06",
    name: "Ruchika Layani",
    region: "piliyandala",
    phone: "0778394538",
    address: "2/45, Temple Road, Kahathuduwa",
  },
  {
    id: "MD07",
    name: "Thushari Hapuarachchi",
    region: "miriswaththa",
    phone: "0712963947",
    address: "5/35, School Lane, Horana",
  },
];

const midwife = () => {
  return (
    <div className="content-container">
      <Heading title={"Midwife Details"} />

      <div className="w-full h-full">
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
        />
      </div>
    </div>
  );
};

export default midwife;
