import { contentStyles } from "../../../Util/Create-article/constants";
import styles from "./main.module.css";

export default function ContentStyle({ changeHandler, blurHandler , value, className}) {
  return (
    <div className={`${className} mb-3`}>
      <label htmlFor="tone_of_voice" className="form-label mb-1">
        أسلوب المحتوى
      </label>
      <select
        name="tone_of_voice"
        id="tone_of_voice"
        className={`${styles["form-select"]} ${styles["input"]} form-select`}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      >
        <option value=""></option>
        {contentStyles.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
