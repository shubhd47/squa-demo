import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import Jobs from "../Jobs";
import Announcement from "../Announcements";
import Community from '../Community'
import styles from './layout.module.css';

function Layout() {
  return (
    <>
      <Sidenav>
        <Box
          className={styles.main}
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 6 }}
        >
          <Jobs />
          <div className={styles.newSection}>
            <Announcement />
          </div>
          <div className={styles.newSection}>
            <Community />
          </div>
        </Box>
      </Sidenav>
    </>
  );
}

export default Layout;
