import { errorType, Toast } from "@/components/toast";
import Heading from "@/components/ui/heading";
import EmployeeService from "@/service/employeeService";
import { formatTime } from "@/utils/FormatTime";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function createData(name, value) {
  return { name, value };
}

const dateTableRows = [createData("2024/12/12", "status")];

const HomeVisit = () => {
  const [parentData, setParentData] = useState({});
  const [visits, setVisits] = useState([]);
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  const dataTableRows = [
    createData("Mother's Name", parentData.motherName),
    createData("Father's Name", parentData.fatherName),
    createData("Address", parentData.address),
    createData("Mother's Phone Number", parentData.motherPhone),
    createData("Father's Phone Number", parentData.fatherPhone),
  ];

  const parseLocation = (locationData) => {
    try {
      return JSON.parse(locationData || "{}");
    } catch (error) {
      Toast("Invalid location data", errorType.ERROR);
      return {};
    }
  };

  useEffect(() => {
    let isComponentMounted = true;
    const fetchParentDataForMidwife = async () => {
      try {
        setIsLoading(true);
        const response = await EmployeeService.getMidwifeHomeVisitsData(userId);
        if (isComponentMounted) {
          setParentData(response);
          setVisits(response.visits);
          setLocation(parseLocation(response.location));
        }
      } catch (error) {
        const data = error.response?.data || "Error occurred";
        Toast(data || "Error occurred", errorType.ERROR);
        navigate("/");
      } finally {
        if (isComponentMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchParentDataForMidwife();
    return () => {
      isComponentMounted = false;
    };
  }, [userId, navigate]);

  const isValidLocation =
    location?.lat &&
    location?.lng &&
    !isNaN(location.lat) &&
    !isNaN(location.lng);

  const mapUrl = isValidLocation
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        location.lat
      )},${encodeURIComponent(location.lng)}&hl=es;z=14&output=embed`
    : "about:blank";

  return (
    <div className="content-container">
      <Heading title={"Home Visit"} />
      <div className="flex gap-20">
        <div>
          <iframe
            src={mapUrl}
            width="500"
            height="600"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Location map"
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
                {visits.map((visit) => (
                  <TableRow
                    key={visit.id}
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
                      {visit.date}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        paddingTop: 1.2,
                        paddingBottom: 1.2,
                      }}
                    >
                      {formatTime(visit.time)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        paddingTop: 1.2,
                        paddingBottom: 1.2,
                      }}
                    >
                      {
                        <Chip
                          label={`${visit.visitStatus}`}
                          size={"small"}
                          sx={{
                            backgroundColor:
                              visit.visitStatus !== "PENDING"
                                ? "#EBF9F1"
                                : "#C5BCFF",
                            color:
                              visit.visitStatus !== "PENDING"
                                ? "#1F9254"
                                : "#1F4692",
                            width: "60%",
                          }}
                        />
                      }
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

export default HomeVisit;
