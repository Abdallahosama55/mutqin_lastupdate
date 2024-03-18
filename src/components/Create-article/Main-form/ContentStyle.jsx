import { MenuItem, Select } from "@mui/material";
import { contentStyles } from "../../../Util/Create-article/constants";
import styles from "./main.module.css";
import "./mui.css";
export default function ContentStyle({ value, formik }) {
  return (
    <div className={` mb-3`}>
      <label htmlFor="tone_of_voice" className="form-label mb-1">
        أسلوب المحتوى
      </label>

      <Select
        className={`${styles["form-select"]} ${styles["input"]}`}
        value={value}
        name="tone_of_voice"
        onChange={(e) => {
          formik.setFieldValue(e.target.name, e.target.value);
        }}
      >
        {contentStyles.map((c, i) => (
          <MenuItem key={i} value={c} className={`${styles["select-item"]}`}>
            {c}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
