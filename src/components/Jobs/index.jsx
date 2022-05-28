import { Divider } from "@mui/material";
import styles from "./jobs.module.css";
import { useState, useEffect } from "react";
import Slider from "../Slider";
import SkeletonLoader from '../SkeletonLoader';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    fetch("https://mockend.com/nillion/frontend-challenge/jobs?limit=20")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        let jobsResponse = response.map((job) => {
          return {
            id:job['id'],
            imageUrl: job["businessLogo"],
            job: job["title"],
            title: job["businessName"],
            upto: job["earnings"],
            time: job["estimatedTime"],
          };
        });
        setJobs(jobsResponse);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onCardClick = (title)=>{
    alert(title)
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Recommended jobs for you</div>
      <Slider id="jobs" count={jobs?.length}>
        {jobs.length ? (
          <>
            {jobs.map((job) => (
              <div onClick={()=>onCardClick(job['title'])} key={job['id']} className={styles.card}>
                <div className={styles.cardHeading}>
                  <div className={styles.cardAvatar}>
                    <img
                      className={styles.avatarImg}
                      src={job["imageUrl"]}
                      alt=""
                    />
                  </div>
                  <div className={styles.cardTexts}>
                    <p className={styles.heading1}>{job["job"]}</p>
                    <p className={styles.heading2}>{job["title"]}</p>
                  </div>
                </div>
                <Divider className={styles.divider} />
                <div className={styles.cardBody}>
                  <div className={styles.jobCountAndTimeWrapper}>
                    <div className={styles.iconBox}>
                    <AccessTimeIcon fontSize="small"/>
                    </div>
                    <div className={styles.jobTexts}>
                      <p className={styles.jobTextOne}>Upto</p>
                      <p className={styles.jobTextTwo}>{job["upto"]}</p>
                    </div>
                  </div>
                  <div className={styles.jobCountAndTimeWrapper}>
                    <div className={styles.iconBox}>
                    <AccessTimeIcon fontSize="small"/>
                    </div>
                    <div className={styles.jobTexts}>
                      <p className={styles.jobTextOne}>Time</p>
                      <p className={styles.jobTextTwo}>{job["time"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          // null
          <>
            <SkeletonLoader />
          </>
        )}
      </Slider>
    </div>
  );
}

export default Jobs;
