import styles from "./DNavbar.module.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../../../redux/slices/darkmodeSlice";

export const DNavbar = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

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
            {data.avatar ? (
              <img src={data.avatar} alt="" className={styles.avatar} />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
                className={styles.avatar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
