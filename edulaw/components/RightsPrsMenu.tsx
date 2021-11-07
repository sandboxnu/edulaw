import React from "react";
import Router from "next/router";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SubMenuItem from "./SubMenuItem";
import Link from 'next/link'

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

  const MainListItem = (index : any, label : string, link : string) => {
    return(
      <Link href={link} passHref>
        <ListItemButton
          onClick={(event) => handleClick(event, index)}
          sx={{ width: "100%" }}
        >
          <ListItemText primary={label} sx={{ fontSize: "22px", fontWeight: 400, pl: 1 }}/>
          {selectedIndex === index ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Link>
    );
  }

  return (
    <List sx={{ width: "100%", background: "#F4F5F7", padding: '4px', position: 'sticky', top: '4px'}}>
      {MainListItem("0", "Student Rights", "/studentrights")}
      <Collapse in={selectedIndex === "0"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem label={"School Discipline & Education"} link={"/studentrights#school-discipline"} />
          <SubMenuItem label={"Special Education"} link={"/studentrights#special-education"} />
          <SubMenuItem label={"Bullying"} link={"/studentrights#bullying"}/>
        </List>
      </Collapse>
      <Divider />
      {MainListItem("1", "About PRS", "/aboutprs")}
      <Collapse in={selectedIndex === "1"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem label={"How do I file a complaint?"} link={"/aboutprs#how-to-file"} />
          <SubMenuItem label={"When can I file a complaint?"} link={"/aboutprs#when-to-file"}/>
          <SubMenuItem label={"Who can file a complaint?"} link={"/aboutprs#who-can-file"}/>
          <SubMenuItem label={"What happens when I file?"} link={"/aboutprs#what-happens"}/>
        </List>
      </Collapse>
      <Divider />
    </List>
  );
}

export default RightsPrsMenu;
