import styles from "./community.module.css";
import { useState, useEffect } from "react";
import Slider from "../Slider";
import SkeletonLoader from "../SkeletonLoader";

function Announcement() {
  const [community, setCommunity] = useState([]);

  const fetchCommunity = () => {
    fetch("https://mockend.com/nillion/frontend-challenge/resources?limit=2")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        let communityResponse = response.map((community) => {
          return {
            id: community["id"],
            imageUrl: community["image"],
            title: community["title"],
            detail: community["description"],
          };
        });
        setCommunity(communityResponse);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const limitString = (str) => {
    if (str.length > 60) {
      return `${str.substring(0, 60)}...`;
    }
    return str;
  };

  const onCardClick = (title) => {
    alert(title);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Community</div>
      <Slider id={"community"} count={community?.length}>
        {community.length ? (
          <>
            {community.map((article) => (
              <div
                onClick={() => onCardClick(article["title"])}
                key={article["id"]}
                className={styles.card}
              >
                <div className={styles.cardHeading}>
                  <img
                    className={styles.avatarImg}
                    src={article["imageUrl"]}
                    alt=""
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.bodyTitle}>{article["title"]}</p>
                  <p className={styles.bodyDetail}>
                    {limitString(article["detail"])}
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
