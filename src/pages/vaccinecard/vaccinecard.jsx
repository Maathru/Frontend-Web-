import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { HiOutlinePrinter } from "react-icons/hi";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Heading from "@/components/ui/heading";
import { useTitle } from "@/hooks/useTitle";
import { errorType, Toast } from "@/components/toast";
import { format } from "date-fns";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import YesNoButton from "@/components/userComponents/yesNoButton";

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const FormattedDate = (params) => {
  if (!params) return "";

  const date = new Date(params);

  return format(date, "MMMM do, yyyy");
};

function QuickSearchToolbar() {
  const { t } = useTranslation("VaccineCard");

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
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button className="bg-primary-purple h-10 flex items-center">
          {t("Give Vaccine Details")}
        </Button>
        <Button className="bg-primary-purple h-10 flex items-center">
          <HiOutlinePrinter className="mr-2 h-5 w-5" />
          {t("Print Vaccine Card")}
        </Button>
      </Box>
    </Box>
  );
}

const columns = [
  { field: "name", headerName: "Vaccine Name", width: 275 },
  {
    field: "dateScheduled",
    headerName: "Date Scheduled",
    flex: 1,
    valueGetter: FormattedDate,
  },
  {
    field: "dateAdministered",
    headerName: "Date Administered",
    flex: 1,
    valueGetter: FormattedDate,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <YesNoButton
        value={params.value === "Administered"}
        onChange={(newValue) => {
          params.api.updateRows([
            { id: params.id, status: newValue ? "Administered" : "Pending" },
          ]);
        }}
        disabled={true}
      />
    ),
  },
  { field: "details", headerName: "Details", flex: 1 },
];

const sampleRecord = [
  {
    id: 1,
    name: "BCG",
    dateScheduled: new Date(),
    dateAdministered: null,
    status: "Administered",
    details:
      "Protects against tuberculosis using a weakened strain of Mycobacterium bovis",
  },
  {
    id: 2,
    name: "OPV & Pentavalent (DTP-HepB-Hib)",
    dateScheduled: new Date(2024, 9, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 3,
    name: "fIPV (Fractional IPV)",
    dateScheduled: new Date(2024, 9, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 4,
    name: "OPV & Pentavalent (DTP-HepB-Hib)",
    dateScheduled: new Date(2024, 11, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 5,
    name: "fIPV (Fractional IPV)",
    dateScheduled: new Date(2024, 11, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 6,
    name: "OPV & Pentavalent (DTP-HepB-Hib)",
    dateScheduled: new Date(2025, 1, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 7,
    name: "MMR",
    dateScheduled: new Date(2025, 4, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 8,
    name: "Live JE",
    dateScheduled: new Date(2025, 10, 31),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 9,
    name: "OPV & DTP",
    dateScheduled: new Date(2026, 4, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 10,
    name: "MMR",
    dateScheduled: new Date(2027, 4, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 11,
    name: "OPV & DT",
    dateScheduled: new Date(2029, 4, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 12,
    name: "HPV",
    dateScheduled: new Date(2034, 4, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 13,
    name: "HPV",
    dateScheduled: new Date(2034, 10, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 14,
    name: "aTd (adult Tetanus diphtheria)",
    dateScheduled: new Date(2035, 4, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
  {
    id: 15,
    name: "Rubella (MMR)",
    dateScheduled: new Date(2039, 4, 30),
    dateAdministered: null,
    status: "Pending",
    details: "",
  },
];

const VaccineCard = () => {
  useTitle("Vaccines");
  const [rows, setRows] = useState(sampleRecord);
  const { t } = useTranslation("VaccineCard");
  const title = t("Vaccine Card");

  const childDetails = {
    name: "Aranya Fernando",
    sex: "Female",
    birthday: new Date(2024, 8, 31),
    motherName: "Amara Fernando",
    fatherName: "Sanjay Fernando",
    bloodType: "O+",
    specialNotes: "Allergic to peanuts",
  };

  const details = [
    [
      { label: t("Name"), value: childDetails.name },
      { label: t("Sex"), value: childDetails.sex },
      { label: t("Birthday"), value: FormattedDate(childDetails.birthday) },
    ],
    [
      { label: t("Mother's Name"), value: childDetails.motherName },
      { label: t("Father's Name"), value: childDetails.fatherName },
    ],
    [
      { label: t("Blood Type"), value: childDetails.bloodType },
      { label: t("Special Notes"), value: childDetails.specialNotes },
    ],
  ];

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await VaccineService.getAllVaccines();
        setRows(response);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    return () => {
      fetchVaccines();
    };
  }, []);

  return (
    <div className="content-container">
      <Heading title={title} />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{t("Child Details")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {details.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-1 w-full">
              {row.map((detail, index) => (
                <div key={index} className="flex-1 flex space-x-2">
                  <CardDescription className="font-bold">
                    {detail.label}:
                  </CardDescription>
                  <CardDescription>{detail.value}</CardDescription>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

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

export default VaccineCard;
