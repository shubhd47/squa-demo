import styles from "./announcements.module.css";
import { useState, useEffect } from "react";
import Slider from "../Slider";
import SkeletonLoader from "../SkeletonLoader";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = () => {
    fetch(
      "https://mockend.com/nillion/frontend-challenge/announcements?limit=20"
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        let announcementResponse = response.map((announcement) => {
          return {
            id:announcement['id'],
            imageUrl: announcement["avatar"],
            name: announcement["title"],
            title: announcement["subtitle"],
            detail: announcement["description"],
          };
        });
        setAnnouncements(announcementResponse);
      })
      .catch((err) => {
        console.error(err)
      });
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const limitString = (str) => {
    if (str.length > 60) {
      return `${str.substring(0, 60)}...`;
    }
    return str;
  };

  const onCardClick = (title)=>{
    alert(title)
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Announcements</div>
      <Slider id={"announcement"} count={announcements?.length}>
        {announcements.length ? (
          <>
            {announcements.map((announcement) => (
              <div onClick={()=>onCardClick(announcement["title"])} key={announcement['id']} className={styles.card}>
                <div className={styles.cardHeading}>
                  <div className={styles.cardAvatar}>
                    <img
                      className={styles.avatarImg}
                      src={announcement["imageUrl"]}
                      alt=""
                    />
                  </div>
                  <div className={styles.cardTexts}>
                    <p className={styles.heading1}>{announcement["name"]}</p>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.bodyTitle}>{announcement["title"]}</p>
                  <p className={styles.bodyDetail}>
                    {limitString(announcement["detail"])}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <SkeletonLoader />
          </>
        )}
      </Slider>
    </div>
  );
}

export default Announcement;
