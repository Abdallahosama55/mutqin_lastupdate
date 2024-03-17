import { Stack } from "react-bootstrap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "../../helpers/tiptap-fontsize";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../../helpers/constants";
import EditorToolbar from "../../components/EditorToolbar";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import {
  setContent,
  setText,
  updateDocument,
} from "../../redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ReformulateToolbar from "./ReformulateToolbar";
import ReformulateEditor from "./ReformulateEditor";

const ReformulatePanel = ({
  setExportPDF,
  setHTML,
  setContentEditor,
  setEditorData,
  noGenerate,
  editorData,
}) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const state = useAppSelector((state) => state);
  const editor = useEditor({
    content: "",
    editable: true,

    onUpdate: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
      dispatch(updateDocument({ content: editor.getText(), isEditor: true }));
      dispatch(setText(editor.getText()));
    },

    extensions: [
      StarterKit,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "right",
      }),
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
      }),
      Typography,
      FontSize,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Image.configure({
        inline: true,
      }),
    ],
  });

  const dispatch = useAppDispatch();
  if (editor === null) return null;

  if (editor !== null && setEditorData) {
    setEditorData(editor.getText());
  }
  return (
    <>
      <Stack
        className={`${isBelowDesktop ? "px-0" : " h-100 "}`}
        gap={2}>
        <Stack
          className="justify-content-center  px-2 border-top w-100  "
          direction="horizontal">
          <ReformulateToolbar editor={editor} />
        </Stack>
        <Stack
          className="flex-fill editor  border-top fs-5 position-relative p-4"
          style={{
            minHeight: isBelowDesktop ? "75vh" : "",
          }}>
          <Stack>
            <ReformulateEditor
              setExportPDF={setExportPDF}
              setHTML={setHTML}
              setContentEditor={setContentEditor}
              noGenerate={noGenerate}
              editor={editor}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ReformulatePanel;
