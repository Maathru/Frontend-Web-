import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "../../../components/ui/heading";
import TableSearch from "@/components/TableSearch";
import { IconButton, Typography } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi";
import ParentPopup from "@/components/parentPopup";
import { useTranslation } from "react-i18next";

const columns = [
  { field: "id", headerName: "P. Couple ID", width: 100 },
  {
    field: "name",
    headerName: "Mother / Father",
    flex: 1,
    // width: 300,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.womanName}</Typography>
        <Typography>{params.value.manName}</Typography>
      </div>
    ),
  },
  { field: "address", headerName: "Address", flex: 1 },
  {
    field: "phone",
    headerName: "Telephone",
    flex: 1,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.womanPhone}</Typography>
        <Typography>{params.value.manPhone}</Typography>
      </div>
    ),
  },
  {
    field: "dob",
    headerName: "Date of Birth",
    flex: 1,
    renderCell: (params) => (
      <div>
        <Typography>{params.value.womanDob}</Typography>
        <Typography>{params.value.manDob}</Typography>
      </div>
    ),
  },
  { field: "children", headerName: "No. of Children", flex: 1 },
  {
    field: "delete",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => (
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          color: "#A30D11",
        }}
      >
        <HiOutlineTrash />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: "EC001",
    name: { womanName: "S. B. C. Jayara", manName: "K.K.P. Herrath" },
    address: "154/A, Kaleniya",
    phone: { womanPhone: "0714578650", manPhone: "0714578650" },
    dob: { womanDob: "14/05/1989", manDob: "14/05/1989" },
    children: 2,
  },
  {
    id: "EC002",
    name: { womanName: "S. B. C. Sumana", manName: "K.K.P. Saman" },
    address: "15/W, Kadawatha",
    phone: { womanPhone: "0714578650", manPhone: "0714578650" },
    dob: { womanDob: "14/05/1989", manDob: "14/05/1989" },
    children: 2,
  },
];

const viewAllParents = () => {
  const { t } = useTranslation("viewAllParents");
  return (
    <div className="content-container">
      <Heading title={"Parent Details"} />

      <div className="flex flex-col items-end">
        <ParentPopup addButton="Add New"></ParentPopup>

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
    </div>
  );
};

export default viewAllParents;
