import styles from "./DNavbar.module.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useDispatch } from "react-redux";
import { toggle } from "../../../../redux/slices/darkmodeSlice";

export const DNavbar = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.items}>
          <div className={styles.item}>
            <DarkModeOutlinedIcon
              className={styles.icon}
              onClick={() => dispatch(toggle())}
            />
          </div>
          <div className={styles.item}>
            <NotificationsNoneOutlinedIcon className={styles.icon} />
            <div className={styles.counter}>1</div>
          </div>
          <div className={styles.item}>
            <ChatBubbleOutlineOutlinedIcon className={styles.icon} />
            <div className={styles.counter}>2</div>
          </div>
          <div className={styles.item}>
            <img
              src="https://avatars.githubusercontent.com/u/56309904?s=96&v=4"
              alt=""
              className={styles.avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
