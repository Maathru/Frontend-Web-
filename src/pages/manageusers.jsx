import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageHeading from "@/components/ui/pageHeading";
import { useTitle } from "@/hooks/useTitle";
import UserService from "@/service/userService";
import { errorType, Toast } from "@/components/toast";
import { format } from "date-fns";

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const FormattedDateTime = (params) => {
  if (!params) return "";

  const date = new Date(params);

  const readableDate = format(date, "MMMM do, yyyy"); // "July 26th, 2024"
  const readableTime = format(date, "hh:mm:ss a"); // "06:39:04 PM"

  return `${readableTime} at ${readableDate}`;
};

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#FAEDFF",
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: "#ffffff",
  },
  border: "none",

  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
}));

function QuickSearchToolbar() {
  const { t } = useTranslation("Manageusers");

  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        m: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <GridToolbarQuickFilter
        sx={{
          width: 400,
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "none",
            },
          "& .MuiOutlinedInput-root:focus-within": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      />
      <Button className="bg-[#6F0096] h-10 flexbox items-center">
        {t("Add New User")}
        <HiOutlinePlusSm className="ml-2 h-5 w-5" />
      </Button>
    </Box>
  );
}

const columns = [
  { field: "id", headerName: "User ID", width: 70 },
  { field: "name", headerName: "User Name", width: 130 },
  { field: "email", headerName: "User Email", flex: 1 },
  {
    field: "role",
    headerName: "User Role",
    flex: 1,
    valueGetter: Capitalize,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    flex: 1,
    valueGetter: FormattedDateTime,
  },

  {
    field: "edit",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => (
      <IconButton
        // onClick={() => handleDelete(params.row.id)}
        aria-label="delete"
        size="small"
        sx={{
          color: "#624DE3",
        }}
      >
        <HiOutlinePencilAlt />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => (
      <IconButton
        // onClick={() => handleEdit(params.row.id)}
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

const ManageUsers = () => {
  useTitle("Users");
  const [rows, setRows] = useState([]);
  const { t } = useTranslation("Manageusers");
  const title = t("Manage Users");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setRows(response);
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="content-container">
      <PageHeading title={title} />

      <div style={{ height: "100%", width: "100%", marginTop: "20px" }}>
        <StripedDataGrid
          rows={rows}
          columns={columns}
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
          slots={{ toolbar: QuickSearchToolbar }}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
