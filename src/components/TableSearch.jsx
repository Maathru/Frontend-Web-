import { Box } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

const TableSearch = () => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        m: 2,
        ml: 0,
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
    </Box>
  );
};

export default TableSearch;
