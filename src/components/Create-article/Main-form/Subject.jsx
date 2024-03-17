import styles from "./main.module.css";

export default function Subject({ changeHandler, blurHandler, value ,className}) {
  return (
    <div className={`${className} mb-3`}>
      <label htmlFor="topic" className="form-label mb-1">
        الموضوع
      </label>
      <input
        name="topic"
        type="text"
        className={`${styles["input"]} form-control`}
        id="topic"
        placeholder="اكتب الموضوع"
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      />
    </div>
  );
}
