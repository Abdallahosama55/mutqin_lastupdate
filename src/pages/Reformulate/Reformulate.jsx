import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import ReformulatePanel from "../../components/Reformulate/ReformulatePanel";
import MultiOptionDropDown from "../../components/MultiOptionDropDown";
import ArrowIcon from "../../icons/Arrow";
import { BREAKPOINTS } from "../../helpers/constants";
import { RiFileList2Line } from "react-icons/ri";
import "./Reformulate.css";
import { useBreakpoint } from "use-breakpoint";
import CustomButton from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PiPencilSimpleLine } from "react-icons/pi";
import { exportToFile } from "../../helpers/exportToFile";
import { useDispatch, useSelector } from "react-redux";
import { postData, postRephrase } from "../../redux/slices/apiSlice";
import axios from "axios";
import { baseURL } from "../../redux/api/url";
import toast from "react-hot-toast";
import pdf from "../../assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import html from "../../assets/Images/reformulate/html-file-type-svgrepo-com 1.png";
import txt from "../../assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "../../assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import html2pdf from "html2pdf.js";

const Reformulate = () => {
  const [contentEditor, setContentEditor] = useState();
  const [HTML, setHTML] = useState();
  const [ExportPDF, setExportPDF] = useState();
  console.log("contentEditor", contentEditor);
  const dispatch = useAppDispatch();
  const rephraseDispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state) => state.api.rephrasePost
  );
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);
  const [optionsDropDown, setOptionsDropDown] = useState(false);
  const [dropDownHeader, setDropDownHeader] = useState(false);

  const [editorData, setEditorData] = useState("");

  const ref = useRef(null);
  const refOptions = useRef(null);
  const state = useAppSelector((state) => state);
  const handleClickOutside = () => {
    setExportDropDown(false);
  };

  useOnClickOutside(ref, handleClickOutside);
  useOnClickOutside(refOptions, () => setOptionsDropDown(false));

  const token = localStorage.getItem("token");
  const handleProgress = (event) => {
    if (event.lengthComputable) {
      const percentCompleted = Math.round((event.loaded * 100) / event.total);
      console.log(percentCompleted);
    }
  };

  const handleRephrase = async () => {
    if (editorData === "") return;
    try {
      const resId = await axios.post(
        `${baseURL}v1/text-rephrase/texts/`,
        { prompt: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = resId.data;
      const id = response.unique_id;
      console.log(id);
      const dataFromRephrase = await rephraseDispatch(
        postRephrase({
          endpoint: `v1/text-rephrase/create/${id}/`,
          data: editorData,
          handleProgress: handleProgress,
        })
      );
      toast.success("تم اعادة الصياغة");
    } catch (error) {
      console.log(error);
    }
  };

  const [content, setContent] = useState("");
  // DownLoad TXT
  const handleDownload = () => {
    console.log("test click");
    if (contentEditor.length === 0) return toast.error("لا يوجد محتوي لتحميله");
    try {
      const element = document.createElement("a");
      const file = new Blob([contentEditor], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "editor_content.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("تم تحميل الملف ");
    } catch (error) {
      console.log(error);
    }
  };

  // DownLoad AS HTML
  const handleDownloadHTML = () => {
    try {
      if (contentEditor.length === 0)
        return toast.error("لا يوجد محتوي لتحميله");
      const blob = new Blob([HTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "editor_content.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  //Download as  PDF

  const downloadPdf = () => {
    if (contentEditor.length === 0) return toast.error("لا يوجد محتوي لتحميله");
    try {
      const element = document.getElementById("editor-content");
      const opt = {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.log(error);
    }
  };

  // Download as Doxc

  return (
    <div
      className=" flex-grow-1  mt-3 "
      dir="rtl">
      <div>
        <div className=" d-flex justify-content-end ms-5">
          <div className="position-relative">
            <CustomButton
              className={"px-2 py-1 export-fontSize exportButton"}
              iconSuffix={
                <ArrowIcon
                  color="#001a78"
                  width={10}
                  height={10}
                  rotate={90}
                />
              }
              onClick={() => setExportDropDown((prev) => !prev)}>
              تصدير
            </CustomButton>
            {exportDropDown && (
              <div
                dir="ltr"
                className="  dropListExport   position-absolute">
                <button
                  onClick={handleDownloadHTML}
                  className="DroplistButton">
                  <div className="flex-grow-1 text-center">HTML</div>
                  <img
                    src={html}
                    className=" droplistImage"
                  />
                </button>
                <button
                  onClick={handleDownload}
                  className="DroplistButton">
                  <div className="flex-grow-1 text-center">TXT</div>
                  <img
                    src={txt}
                    className=" droplistImage"
                  />
                </button>
                <button
                  onClick={downloadPdf}
                  className="DroplistButton">
                  <div className=" flex-grow-1 text-center">PDF</div>
                  <img
                    src={pdf}
                    className=" droplistImage"
                  />
                </button>
                <button
                  // onClick={downloadAsDocx}
                  className="DroplistButton">
                  <div className=" flex-grow-1 text-center">DOXC</div>
                  <img
                    src={doc}
                    className=" droplistImage"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ height: "80vh" }}
        className=" overflow-y-auto row mt-2 px-5">
        {/* first */}
        <div className=" col-12  col-lg-6 px-2 pt-3    p-0">
          {" "}
          <div className=" h-100   contianer-editor pt-3    p-0">
            <div className="px-3 pb-3  d-flex justify-content-between align-items-center">
              <div className=" d-flex gap-3 align-items-center">
                <button
                  onClick={handleRephrase}
                  className="generat-button">
                  اعادة صياغة
                </button>
                <select className="custom-droplist">
                  <option className=" border-0">العربية</option>
                  <option>الانجليزية</option>
                </select>
              </div>
              <div>
                <RiFileList2Line />
              </div>
            </div>

            {/* writer */}
            <div>
              <ReformulatePanel
                editorData={editorData}
                setEditorData={setEditorData}
              />
            </div>
          </div>
        </div>

        {/* header */}

        {/* Second */}
        <div
          style={{ height: "80vh" }}
          className=" col-12 col-lg-6  px-2 pt-3    p-0">
          {" "}
          <div className="   h-100 contianer-editor pt-3    p-0">
            <div className="px-3 pb-3  d-flex justify-content-start align-items-center">
              <div>
                <PiPencilSimpleLine />
              </div>
            </div>

            {/* writer */}
            <div>
              <ReformulatePanel
                setExportPDF={setExportPDF}
                setHTML={setHTML}
                setContentEditor={setContentEditor}
                noGenerate="no"
              />
            </div>
          </div>
        </div>

        {/* <div className=" col-6">
          <div></div>
          <div>
            <ReformulatePanel />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Reformulate;
