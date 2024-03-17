import { EditorContent } from "@tiptap/react";
import { Stack } from "react-bootstrap";
import CustomButton from "./Button";
import PasteIcon from "../icons/Paste";
import UploadIcon from "../icons/Upload";
import Card from "./Card";
import CopyIcon from "../icons/Copy";
import DownloadIcon from "../icons/Download";
import ArrowIcon from "../icons/Arrow";
import { themeColors } from "../theme";
import { BREAKPOINTS } from "../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  correctMistake,
  correctMistakes,
  setContent,
} from "../redux/features/api/apiSlice";
import { getTextFromFile } from "../helpers/getTextFromFile";
import { exportToFile } from "../helpers/exportToFile";
import lodash from "lodash";

const CheckerEditor = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";

  const state = useAppSelector((state) => state);
  const objectErrors = state.checker.mistakes["Spelling Mistakes"];
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(state.checker.checkerAi.aiResponse)
      .run();
  }, [state.checker.checkerAi.aiResponse]);

  useEffect(() => {
    console.log(document.querySelector(".btn-correct"));
    document.querySelector(".btn-correct")?.addEventListener("click", (e) => {
      dispatch(
        correctMistake({
          mistake: [e.target.id],
          correct: e.target.textContent,
        })
      );
    });
  }, [state.checker.mistakes]);
  return (
    <>
      {!editor.getText().length && (
        <Stack
          direction="horizontal"
          gap={3}
          className={`position-absolute ${
            isBelowDesktop
              ? "bottom-0 start-50 translate-middle w-100 justify-content-center "
              : "top-0 start-0 m-4"
          } `}
        >
          <CustomButton
            iconPrefix={<PasteIcon />}
            outline
            onClick={() => {
              try {
                navigator.clipboard.readText().then((text) => {
                  dispatch(setContent(text));
                });
              } catch (error) {}
            }}
          >
            ضع النص
          </CustomButton>
          <CustomButton
            iconPrefix={<UploadIcon />}
            outline
            className="position-relative"
          >
            <input
              type="file"
              className="
              opacity-0
              position-absolute
              w-100
              h-100
              top-0
              start-0
            "
              accept=".doc,.docx,.pdf,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  getTextFromFile(formData, state.checker.currentDoc).then(
                    (text) => {
                      dispatch(setContent(text));
                    }
                  );
                }
              }}
            />
            تحميل ملف
          </CustomButton>
        </Stack>
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: replaceHtmlWithHighlightedText(
            editor.getText(),
            state.checker.mistakes
          ),
        }}
        style={{
          position: "absolute",
        }}
      ></div>
      <div
        style={{
          opacity: 1,
          position: "absolute",
          color: "transparent",
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {!editor.getText() && (
        <Stack
          Stack
          style={{
            opacity: 0.3,
          }}
          className="place-holder position-absolute text-text-gray fw-light fs-5"
        >
          ابدأ بكتابة نص أو ضع النص الذي تريد تدقيقه لُغَوِيّاً في المحرر (+V)
          أو تحميل <br /> مستند (DOC،PDF،TXT).
        </Stack>
      )}
      {!isBelowDesktop && (
        <Card className="position-absolute  bottom-0 start-50 translate-middle mb-2 bg-light">
          <Stack direction="horizontal" gap={5}>
            <CustomButton
              onlyIcon
              onClick={() => {
                navigator.clipboard.writeText(editor.getText());
              }}
            >
              <CopyIcon />
            </CustomButton>

            <CustomButton
              onlyIcon
              onClick={() => {
                exportToFile(state.checker.content, "pdf");
              }}
            >
              <DownloadIcon />
            </CustomButton>

            <div className="position-relative">
              <CustomButton
                iconSuffix={
                  <ArrowIcon color={themeColors.colors.primary} rotate={90} />
                }
                outline
                onClick={() => setDropDown(!dropDown)}
              >
                {editor.getText().trim().split(/\s+/).length + " كلمات"}
              </CustomButton>
              {dropDown && (
                <MultiOptionDropDown
                  top
                  options={[
                    {
                      value:
                        editor.getText().trim().split(/\s+/).length + " كلمات",
                      className: "px-4 border-bottom mt-2",
                    },
                    {
                      value:
                        editor.getText().replace(/\s+/g, "").length + " حرف",
                      className: "px-4 border-bottom mt-2",
                    },
                    {
                      value: editor.getText().split(". ").length - 1 + " جملة",
                      className: "px-4 border-bottom mt-2",
                    },
                  ]}
                  onClose={() => setDropDown(false)}
                />
              )}
            </div>

            <CustomButton onClick={() => dispatch(correctMistakes({}))}>
              صحح الأخطاء
            </CustomButton>
            <CustomButton onlyIcon>
              <Stack
                direction="horizontal"
                className="rounded-circle border border-primary items-center justify-center position-relative"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <div
                  className="position-absolute top-50 start-50"
                  style={{
                    transform: "translate(-50%,-40%)",
                  }}
                >
                  {
                    Object.keys(
                      state.checker.mistakes["Spelling Mistakes"] || {}
                    ).length
                  }
                </div>
              </Stack>
            </CustomButton>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default CheckerEditor;

const replaceHtmlWithHighlightedText = (html, objectMistakes) => {
  for (const mistakeKey in objectMistakes) {
    const mistakes = objectMistakes[mistakeKey];
    for (const mistake in mistakes) {
      if (!lodash.isArray(mistakes[mistake])) {
        const regEx = new RegExp("(" + mistake + ")(?!([^<]+)?>)", "gi");

        html = html.replaceAll(
          regEx,
          ` <div 
          
          class="${accordionData[mistakeKey]?.class} hover-to-display"
          
          style="position:relative;display:inline">
          ${mistake}
          
           <div class="popuptext" >
           <div class="popuptext-content">
         
         
  <div >
  <small class="text-info">

  الصواب
  </small>
  </div>
  <div>
  ${mistake} -> <span class="btn btn-primary btn-correct mistake-${mistake}" id="${mistake}"> ${mistakes[mistake]}</span>
            </div>
           </div>
              </div>

        </div>`
        );
      } else {
        const regEx = new RegExp("(" + mistake + ")(?!([^<]+)?>)", "gi");

        html = html.replaceAll(
          regEx,
          ` <div 
          
            class="${accordionData[mistakeKey]?.class} hover-to-display"
            
            style="position:relative;display:inline">
            ${mistake}
            
             <div class="popuptext" >
             <div class="popuptext-content">
  <div >
  <small class="text-info">

  الصواب
  </small>
  </div>
  <div>
  ${mistake} -> <span class="btn btn-primary btn-correct mistake-${mistake}" id="${mistake}"> ${mistakes[mistake][0]}</span>
            </div>
             </div>
                </div>
  
          </div>`
        );
      }
    }
  }
  return html;
};

const accordionData = {
  "Spelling Mistakes": {
    class: "mistake",
  },
  "Grammar Check": {
    class: "grammar",
  },
  Lexicon: {
    class: "lexicon",
  },
  Drafting: {
    class: "drafting",
  },
  "Other Corrections": {
    class: "other-corrections",
  },
};
