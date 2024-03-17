import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import {
  addKeyword,
  delKeyword,
  setArticle,
  setSubTitles,
  setTitle,
} from "../../../redux/slices/createArticle/articleSlice";
import { useState } from "react";
export default function SideBox({ phase, data }) {
  const [subTitlesSelected, setSubTitlesSelected] = useState(null);
  const dispatch = useDispatch();
  const { keywords, title, article } = useSelector((s) => s.article);
  return (
    <div
      className={`${styles["box-container"]} ${
        phase > 1 ? styles["phase-2-3"] : ""
      }`}
    >
      <h5
        className={`${phase === 0 || phase === 1 ? styles["phase0"] : ""} ${
          styles["title"]
        } px-2 mb-0`}
      >
        {phase === 0
          ? "الكلمات المقترحة"
          : phase === 1
          ? "العناويين المقترحة"
          : phase === 2
          ? "العناويين الفرعية المقترحة"
          : "المقال"}
      </h5>
      {phase === 3 && article.length ? (
        <div className="mb-3 h-100">
          <textarea
            className={`form-control ${styles["main-article"]}`}
            rows="20"
            value={article}
            onChange={(e) => {
              dispatch(setArticle(e.target.value));
            }}
          ></textarea>
        </div>
      ) : !Array.isArray(data) || !data?.length ? (
        <>
          {
            <p className={`${styles["description"]} mb-0 py-2 pe-2`}>
              {phase === 0
                ? "سيتم إدراج الكلمات المفتاحية التي تم إنشاؤها هنا"
                : phase === 1
                ? "سيتم إدراج العناوين التي تم إنشاؤها هنا"
                : phase === 2
                ? "سيتم إدراج العناوين الفرعية التي تم إنشاؤها هنا"
                : "سيتم أدراج المقال هنا"}
            </p>
          }
          {phase === 0 ? (
            <p className={`${styles["extra-description"]} mb-0 py-2 pe-2`}>
              * يتم إنشاء جميع الكلمات المفتاحية بناءً على موضوعك
            </p>
          ) : null}
        </>
      ) : phase === 0 || phase === 1 ? (
        <ul className={` ${styles["list-item"]} `}>
          {data.map((item, i) => (
            <li key={i} className="py-3 pe-3">
              <label className="d-flex align-items-center ">
                <input
                  checked={
                    phase === 0 ? keywords.includes(item) : title === item
                  }
                  name="list-item"
                  type={phase === 0 || phase === 2 ? "checkbox" : "radio"}
                  value={item}
                  onChange={(e) => {
                    if (phase === 0)
                      e.target.checked
                        ? dispatch(addKeyword(item))
                        : dispatch(delKeyword(item));
                    if (phase === 1) dispatch(setTitle(item));
                  }}
                />
                <span className="me-3">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {data.map((subT, index) => (
            <ul
              key={index}
              onClick={() => {
                setSubTitlesSelected(index);
                dispatch(setSubTitles(subT));
              }}
              className={` ${styles["list-item"]} 
              ${styles["list-item-sub-titles"]} ${
                subTitlesSelected === index
                  ? styles["list-item-sub-titles__selected"]
                  : ""
              } pe-5`}
            >
              {subT.map((sub, i) => (
                <li key={i} className="mb-1">
                  {sub}
                </li>
              ))}
            </ul>
          ))}
        </>
      )}
    </div>
  );
}
