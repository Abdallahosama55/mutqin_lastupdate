import { allLanguages } from "../../../Util/Create-article/constants";
import styles from "./main.module.css";

export default function Language({
  changeHandler,
  blurHandler,
  value,
  phase,
  className,
}) {
  return (
    <div className={`${phase === 3 ? "mb-3" : "mb-4"} ${className}`}>
      <label htmlFor="language" className="form-label mb-1">
        اللغة
      </label>
      <select
        name="language"
        id="language"
        className={`${styles["form-select"]} ${styles["input"]} form-select`}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      >
        <option value=""></option>
        {allLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
