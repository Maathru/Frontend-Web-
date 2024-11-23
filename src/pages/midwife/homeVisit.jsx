import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import EmployeeService from "@/service/employeeService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function createData(name, value) {
  return { name, value };
}

const dateTableRows = [createData("2024/12/12", "status")];

const homeVisit = () => {
  const [parentData, setParentData] = useState({});
  const [location, setLocation] = useState({});
  const userId = useParams();

  console.log(userId);

  const dataTableRows = [
    createData("Mother's Name", parentData.motherName),
    createData("Father's Name", parentData.fatherName),
    createData("Address", parentData.address),
    createData("Mother's Phone Number", parentData.motherPhone),
    createData("Father's Phone Number", parentData.fatherPhone),
  ];

  useEffect(() => {
    const fetchParentDataForMidwife = async () => {
      try {
        const response = await EmployeeService.getMidwifeHomeVisitsData(
          userId.userId
        );
        setParentData(response);
        setLocation(JSON.parse(response.location));
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchParentDataForMidwife();
  }, []);

  return (
    <div className="content-container">
      <Heading title={"Home Visit"} />
      <div className="flex gap-20">
        <div>
          <iframe
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=14&output=embed`}
            width="500"
            height="600"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
          ></iframe>
        </div>
        <div>
          <Typography variant="h6">Parent Details</Typography>

          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="parent details table">
              <TableBody>
                {dataTableRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        paddingTop: 1.2,
                        paddingBottom: 1.2,
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        paddingTop: 1.2,
                        paddingBottom: 1.2,
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <Typography variant="h6">Home Visit Dates</Typography>

          <TableContainer>
            <Table sx={{ minWidth: 200 }} aria-label="home visit dates table">
              <TableBody>
                {dateTableRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        paddingTop: 1.2,
                        paddingBottom: 1.2,
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        paddingTop: 1.2,
                        paddingBottom: 1.2,
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default homeVisit;
