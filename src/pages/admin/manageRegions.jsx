import { StripedDataGrid } from "@/components/StripedDataGrid";
import Heading from "@/components/ui/heading";
import React, { useEffect, useState } from "react";
import map from "../../assets/mapMOH.png";
import TableSearch from "@/components/TableSearch";
import RegionAddPopup from "@/components/RegionsAddPopup";
import { useTitle } from "@/hooks/useTitle";
import RegionService from "@/service/regionService";
import { errorType, Toast } from "@/components/toast";
import { IconButton } from "@mui/material";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import DeleteConfirmationDialog from "@/components/deleteConfirmationDialog";

const manageRegions = () => {
  useTitle("Regions");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    regionName: "",
    midwife: "",
    population: "",
  });

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
  }, [isSaved, isDeleted]);

  const handleDelete = async (id) => {
    try {
      const response = await RegionService.deleteRegion(id);
      Toast(response, errorType.SUCCESS);
      setIsDeleted((pre) => !pre);
    } catch (error) {
      console.log(error.message);
      const data = error.response.data;
      console.log(data);
      Toast(data || "Error occurred", errorType.ERROR);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleCellClick = async (params) => {
    if (params.field === "delete") {
      return;
    }

    await fetchRegionData(params.id);
  };

  const fetchRegionData = async (regionId) => {
    try {
      const response = await RegionService.getRegion(regionId);

      setFormData(response);
      setIsOpen(true);
      setIsDisabled(true);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const columns = [
    {
      field: "regionId",
      headerName: "Region ID",
      width: 90,
      headerClassName: "bold",
    },
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
    {
      field: "edit",
      headerName: "",
      flex: 0.1,
      renderCell: () => (
        <IconButton
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
          onClick={() => confirmDelete(params.row.regionId)}
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

  return (
    <div className="content-container">
      <Heading title={"Manage Regions"} />

      <RegionAddPopup
        addButton={"Add New Region"}
        regionName={"Region Name"}
        population={"Population"}
        midwife={"Assign Midwife"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsSaved={setIsSaved}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        formData={formData}
        setFormData={setFormData}
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
            onCellClick={handleCellClick}
          ></StripedDataGrid>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        item={"region"}
        handleDelete={() => handleDelete(deleteId)}
      />
    </div>
  );
};

export default manageRegions;
