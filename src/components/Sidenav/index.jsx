import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { MENU } from "../../constants";
import styles from './sidenav.module.css';
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  const router= useRouter();
  const [active, setActive] = useState('/');

  useEffect(()=>{
    if(router){
      setActive(router.pathname)
    }
  },[router?.asPath])

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List className={styles.menuContainer}>
          {MENU?.map((menu, index) => (
            <ListItem  key={index} disablePadding>
              <ListItemButton className={`${styles.link} ${active===menu.path?styles.active:''}`}>
                <ListItemIcon className={styles.linkIcon}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText className={styles.linkText}  primary={menu.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {props.children}
    </Box>
  );
}
