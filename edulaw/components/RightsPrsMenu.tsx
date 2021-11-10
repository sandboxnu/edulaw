import React from "react";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SubMenuItem from "./SubMenuItem";
import Link from 'next/link';

enum MENU_OPTS {
  STUDENT_RIGHTS = "/studentrights",
  ABOUT_PRS = "/aboutprs",
}

function RightsPrsMenu() {
  const router = useRouter();
  const pathname = router.pathname;

  const MainListItem = (label : string, link : string) => {
    return(
      <Link href={link} passHref>
        <ListItemButton sx={{ width: "100%" }}>
          <ListItemText primary={label} sx={{ fontSize: "22px", fontWeight: 400, pl: 1 }}/>
          <ExpandMore />
        </ListItemButton>
      </Link>
    );
  }

  return (
    <List sx={{ width: "100%", background: "#F4F5F7", padding: '4px', position: 'sticky', top: '4px'}}>
      {MainListItem("Student Rights", MENU_OPTS.STUDENT_RIGHTS)}
      <Collapse in={pathname === MENU_OPTS.STUDENT_RIGHTS} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem label={"School Discipline & Education"} link={`${MENU_OPTS.STUDENT_RIGHTS}#school-discipline`} />
          <SubMenuItem label={"Special Education"} link={`${MENU_OPTS.STUDENT_RIGHTS}#special-education`} />
          <SubMenuItem label={"Bullying"} link={`${MENU_OPTS.STUDENT_RIGHTS}#bullying`}/>
        </List>
      </Collapse>
      <Divider />
      {MainListItem("About PRS", MENU_OPTS.ABOUT_PRS)}
      <Collapse in={pathname === MENU_OPTS.ABOUT_PRS} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem label={"How do I file a complaint?"} link={`${MENU_OPTS.ABOUT_PRS}#how-to-file`} />
          <SubMenuItem label={"When can I file a complaint?"} link={`${MENU_OPTS.ABOUT_PRS}#when-to-file`}/>
          <SubMenuItem label={"Who can file a complaint?"} link={`${MENU_OPTS.ABOUT_PRS}#who-can-file`}/>
          <SubMenuItem label={"What happens when I file?"} link={`${MENU_OPTS.ABOUT_PRS}#what-happens`}/>
        </List>
      </Collapse>
      <Divider />
    </List>
  );
}

export default RightsPrsMenu;
