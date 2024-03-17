import { EditorContent } from "@tiptap/react";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "../Button";
import { useEffect, useState } from "react";
import PlusCircleIcon from "../../icons/PlusCircle";
import AskAIModal from "../AskAIModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  editorAskAi,
  setTitle,
  updateDocument,
} from "../../redux/features/api/apiSlice";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ReformulateEditor = ({
  setExportPDF,
  setContentEditor,
  editor,
  noGenerate,
  setHTML,
}) => {
  const { data, error, loading } = useSelector(
    (state) => state.api?.rephrasePost
  );
  console.log("data from api editor", data?.rephrased_text);
  const [askAi, setAskAi] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const onAskAi = (content) => {
    dispatch(editorAskAi({ content }));
  };

  if (noGenerate) {
    useEffect(() => {
      if (data?.rephrased_text) {
        editor.commands.setContent(data?.rephrased_text); // Set initial content from API data
      }
    }, [editor, data?.rephrased_text]);

    setContentEditor(editor.getText());
    setHTML(editor.getHTML());
    console.log(editor.getHTML());
  }

  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(state.checker.ai.aiResponse)
      .run();
  }, [state.checker.ai.aiResponse]);
  const { pathname } = useLocation();
  return (
    <>
      {askAi && (
        <AskAIModal
          onClose={() => setAskAi(false)}
          show={askAi}
          action={onAskAi}
        />
      )}
      <div
        dir="rtl"
        id={setExportPDF ? "editor-content" : ""}>
        <EditorContent
          editor={editor}
          onClick={() => editor.commands.focus()}
        />
      </div>
      {noGenerate
        ? null
        : !editor.getText() && (
            <Stack
              className="place-holder custom-placeHolder position-absolute text-text-gray "
              onClick={() => editor.commands.focus()}>
              يُرجى تقديم النص الذي ترغب في صياغته، وسأكون سعيدًا بمساعدتك في
              ذلك
            </Stack>
          )}{" "}
    </>
  );
};

export default ReformulateEditor;
