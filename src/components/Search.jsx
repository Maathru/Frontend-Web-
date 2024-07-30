import { IconButton, InputBase, Paper } from "@mui/material"
import { SearchIcon } from "lucide-react"

const Search = ({placeholder}) => {
  return (
    <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            inputProps={{ "aria-label": "search ..." }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
  )
}

export default Search;