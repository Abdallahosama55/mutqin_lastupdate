import { MenuItem, Select } from "@mui/material";
import { allLanguages } from "../../../Util/Create-article/constants";
import styles from "./main.module.css";
import "./mui.css";

export default function Language({ value, phase, formik }) {
  return (
    <div className={`${phase === 3 ? "mb-3" : "mb-4"} `}>
      <label htmlFor="language" className="form-label mb-1">
        اللغة
      </label>
      <Select
        className={`${styles["form-select"]} ${styles["input"]}`}
        value={value}
        name="language"
        onChange={(e) => {
          formik.setFieldValue(e.target.name, e.target.value);
        }}
      >
        {allLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            className={`${styles["select-item"]}`}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
