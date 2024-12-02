import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "../../../components/ui/heading";
import TableSearch from "@/components/TableSearch";
import { IconButton, Typography } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi";
import ParentPopup from "@/components/parentPopup";
import { useTranslation } from "react-i18next";
import { useTitle } from "@/hooks/useTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EligibleService from "@/service/eligibleService";
import { errorType, Toast } from "@/components/toast";

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

const viewAllParents = () => {
  useTitle("Parents");
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation("viewAllParents");

  useEffect(() => {
    const fetchParentListForMidwife = async () => {
      try {
        const response = await EligibleService.getParentListForMidwife();
        const updatedRows = response.map((r) => ({
          id: r.id,
          name: { womanName: r.womanName, manName: r.manName },
          address: r.address,
          phone: {
            womanPhone: r.womanPhone,
            manPhone: r.manPhone,
          },
          dob: { womanDob: r.womanDob, manDob: r.manDob },
          children: r.children,
          userId: r.userId,
        }));

        setRows(updatedRows);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchParentListForMidwife();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/pregnancy?user=${params.row.userId}`);
  };

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
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default viewAllParents;
