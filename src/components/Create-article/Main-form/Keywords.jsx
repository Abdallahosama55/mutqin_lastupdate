import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import { replaceKeywords } from "../../../redux/slices/createArticle/articleSlice";
export default function Keywords() {
  const { keywords } = useSelector((s) => s.article);

  const dispatch = useDispatch();

  return (
    <div className={` mb-3`}>
      <label htmlFor="keywords" className="form-label mb-1">
        الكلمات المفتاحية
      </label>
      <input
        name="keywords"
        id="keywords"
        type="text"
        value={keywords.join(" ")}
        onChange={(e) => {
          const keywords = e.target.value.split(" ");
          if (keywords.length) {
            dispatch(replaceKeywords(keywords));
          }
        }}
        className={`${styles["input"]} form-control`}
        placeholder="اكتب الكلمات المفتاحية"
      />
    </div>
  );
}
