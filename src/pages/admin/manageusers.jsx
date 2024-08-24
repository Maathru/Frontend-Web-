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
import Heading from "@/components/ui/heading";
import { useTitle } from "@/hooks/useTitle";
import UserService from "@/service/userService";
import { errorType, Toast } from "@/components/toast";
import { format } from "date-fns";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import UserAddPopup from "@/components/UserAddPopup";

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

// function QuickSearchToolbar() {
//   const { t } = useTranslation("Manageusers");

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <TableSearch />

//     </Box>
//   );
// }

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
  const { t } = useTranslation("manageUsers");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setRows(response);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };
    return () => {
      fetchUsers();
    };
  }, []);

  return (
    <div className="content-container">
      <div className="flex justify-between">
        <Heading title={t("title")} />
        <UserAddPopup
          addButton={"Add New User"}
          firstName={t("firstName")}
          lastName={t("lastName")}
          email={t("email")}
          phone={t("phone")}
          nic={t("nic")}
          designation={t("designation")}
          address1={t("address1")}
          street={t("street")}
          city={t("city")}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="w-full h-full">
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
          slots={{ toolbar: TableSearch }}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
