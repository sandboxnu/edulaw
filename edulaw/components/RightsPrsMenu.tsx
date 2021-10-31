import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SubMenuItem from "./SubMenuItem";

// todo: routing (for when overall page is finished)

function RightsPrsMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState("");

  const handleClick = (event: any, index: any) => {
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
    }
  }

  const MainListItem = (index : any, label : string) => {
    return(
      <ListItemButton
        onClick={(event) => handleClick(event, index)}
        sx={{ width: "100%" }}
      >
        <ListItemText primary={label} sx={{ fontSize: "22px", fontWeight: 400, pl: 1 }}/>
        {selectedIndex === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    );
  }

  return (
    <List sx={{ width: "310px", background: "#F4F5F7" }}>
      {MainListItem("0", "Student Rights")}
      <Collapse in={selectedIndex === "0"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem label={"School Discipline & Education"} />
          <SubMenuItem label={"Special Education"} />
          <SubMenuItem label={"Bullying"} />
        </List>
      </Collapse>
      <Divider />
      {MainListItem("1", "About PRS")}
      <Collapse in={selectedIndex === "1"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem label={"How do I file a complaint?"} />
          <SubMenuItem label={"When can I file a complaint?"} />
          <SubMenuItem label={"Who can file a complaint?"} />
          <SubMenuItem label={"What happens when I file?"} />
        </List>
      </Collapse>
      <Divider />
    </List>
  );
}

export default RightsPrsMenu;
