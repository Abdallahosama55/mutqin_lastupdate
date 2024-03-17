import LinkIcon from "../../icons/Link";
import AIIcon from "../../icons/AI";
import BoldIcon from "../../icons/Bold";
import ItalicIcon from "../../icons/Italic";
import PenIcon from "../../icons/Pen";
import ArrowIcon from "../../icons/Arrow";
import { themeColors } from "../../theme";
import UnderlineIcon from "../../icons/Underline";
import RightAlignIcon from "../../icons/RightAlign";
import CenterAlignIcon from "../../icons/CenterAlign";
import LeftAlignIcon from "../../icons/LeftAlign";
import ListIcon from "../../icons/List";
import OrderedListIcon from "../../icons/OrderedList";
import LeftTabIcon from "../../icons/LeftTab";
import RightTabIcon from "../../icons/RightTab";
import UndoIcon from "../../icons/Undo";
import RedoIcon from "../../icons/Redo";
import { Stack } from "react-bootstrap";
import DropdownColor from "../DropdownColor";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import MultiOptionDropDown from "../MultiOptionDropDown";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../../helpers/constants";
import AIModal from "../AIModal";
import LinkModal from "../LinkModal";
import ImageIcon from "../../icons/Image";
import { insertImage } from "../../helpers/set-image";
import ListDropDown from "../ListDropDown";

import "./Res.css";
import CopyIcon from "../../icons/Copy";
import DownloadIcon from "../../icons/Download";
import CustomButton from "../Button";
import { exportToFile } from "../../helpers/exportToFile";
import jsPDF from "jspdf";

import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/hooks";

const ReformulateToolbar = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const state = useAppSelector((state) => state);
  return (
    <Stack
      direction="horizontal"
      className={`gapuser gap-3 w-100 justify-content-center    px-3 bg-light  pt-2   ${
        breakpoint !== "desktop" ? "w-100 py-1 px-2" : ""
      }`}
      style={
        breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : {
              height: "auto",
            }
      }>
      {getToolbarData(editor).map((item, index) => (
        <ToolbarItem
          key={index}
          {...item}
        />
      ))}
    </Stack>
  );
};

const ToolbarItem = ({
  icon,
  title,
  action,
  isColorDropDown,
  dropDownAction,
  isMultiOptionDropDown,
  options,
  Modal,
  isActiveOption,
  isListDropDown,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {Modal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
          show={openModal}
        />
      )}
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center"
        role="button"
        onClick={() => {
          if (action) {
            action();
          }
          if (isColorDropDown || isMultiOptionDropDown || isListDropDown) {
            setOpenDropDown((prev) => !prev);
          }
          if (Modal) {
            setOpenModal(true);
          }
        }}
        ref={ref}
        style={{ width: "max-content" }}>
        <span className="position-relative">
          {icon}
          {openDropDown && isColorDropDown && (
            <DropdownColor dropDownAction={dropDownAction} />
          )}
          {openDropDown && isMultiOptionDropDown && (
            <MultiOptionDropDown
              options={options}
              dropDownAction={dropDownAction}
              isActive={isActiveOption || 0}
            />
          )}
          {openDropDown && isListDropDown && (
            <ListDropDown
              options={options}
              dropDownAction={dropDownAction}
            />
          )}
        </span>
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

// <CustomButton
//     onlyIcon
//     onClick={() => {
//       navigator.clipboard.writeText(editor.getText());
//     }}
//   >
//     <CopyIcon />
//   </CustomButton>

//   <CustomButton
//     onlyIcon
//     onClick={() => {
//       exportToFile(state.checker.content, "pdf");
//     }}
//   >
//     <DownloadIcon />
//   </CustomButton>

const getToolbarData = (editor) => [
  {
    icon: (
      <LinkIcon
        width={16}
        height={16}
      />
    ),
    Modal: LinkModal,
  },
  {
    icon: (
      <CustomButton
        onlyIcon
        onClick={() => {
          exportEditorContentAsPDF(editor.getText());
        }}>
        <DownloadIcon
          width={16}
          height={16}
        />
      </CustomButton>
    ),
  },

  {
    icon: (
      <CustomButton
        onlyIcon
        onClick={() => {
          try {
            navigator.clipboard.writeText(editor.getText());
            toast.success("تم نسخ النص");
          } catch (error) {
            toast.error("حدث خطا اثناء النسخ");
          }
        }}>
        <CopyIcon
          width={16}
          height={16}
          noshow={"test"}
        />
      </CustomButton>
    ),
  },
  // {
  //   icon: (
  //     <AIIcon
  //       width={15}
  //       height={15}
  //     />
  //   ),
  //   Modal: AIModal,
  // },
  {
    icon: (
      <BoldIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: (
      <ItalicIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={8}
        className="align-content-center ">
        <span>
          <PenIcon
            width={16}
            height={16}
          />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={5}
            height={5}
            color={themeColors.colors.primary}
          />
        </span>
      </Stack>
    ),
    isColorDropDown: true,
    dropDownAction: (color) =>
      editor.chain().focus().setHighlight({ color }).run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center">
        <span>
          <UnderlineIcon
            width={16}
            height={16}
          />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={5}
            height={5}
            color={themeColors.colors.primary}
          />
        </span>
      </Stack>
    ),
    isColorDropDown: true,
    dropDownAction: (color) => editor.chain().focus().setColor(color).run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="items-center justify-center">
        <input
          type="text"
          pattern="[0-9]{5}"
          defaultValue={
            editor.getAttributes("textStyle")?.fontSize?.split("px")[0] || 13
          }
          style={{
            width: "16px",
            height: "16px",
            fontSize: "12px",
          }}
          className="text-center border border-primary rounded text-primary fw-medium"
          onBlur={(e) => {
            editor.chain().focus().setFontSize(`${e.target.value}px`).run();
          }}
        />
        <span>
          <ArrowIcon
            rotate={90}
            width={5}
            height={5}
            color={themeColors.colors.primary}
          />
        </span>
      </Stack>
    ),
    isMultiOptionDropDown: true,
    options: [
      {
        value: "8",
        className: "px-2",
      },
      {
        value: "10",
        className: "px-2",
      },
      {
        value: "12",
        className: "px-2",
      },
      {
        value: "14",
        className: "px-2",
      },
    ],
    dropDownAction: (value) =>
      editor.chain().focus().setFontSize(`${value}px`).run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center  p-1 px-2 text-primary bg-reverse rounded">
        <span>
          <ArrowIcon
            rotate={90}
            width={5}
            height={5}
            color={themeColors.colors.primary}
          />
        </span>
        <span className="position-relative">
          {`${
            editor.getAttributes("heading").level
              ? `Heading ${editor.getAttributes("heading").level}`
              : "paragraph"
          }`}
        </span>
      </Stack>
    ),
    options: [
      {
        value: "paragraph",
        className: "fs-6",
      },
      { value: "heading 1", className: "fs-1" },
      {
        value: "heading 2",
        className: "fs-2",
      },
      {
        value: "heading 3",
        className: "fs-3",
      },
      {
        value: "heading 4",
        className: "fs-4",
      },
      {
        value: "heading 5",
        className: "fs-5",
      },
      {
        value: "heading 6",
        className: "fs-6",
      },
    ],
    isMultiOptionDropDown: true,
    dropDownAction: (value) => {
      editor.chain().focus().unsetFontSize().run();

      if (value === "paragraph") editor.chain().focus().setParagraph().run();
      if (value === "heading 1") {
        editor.chain().focus().setHeading({ level: 1 }).run();
      }
      if (value === "heading 2") {
        editor.chain().focus().setHeading({ level: 2 }).run();
      }
      if (value === "heading 3") {
        editor.chain().focus().setHeading({ level: 3 }).run();
      }
      if (value === "heading 4") {
        editor.chain().focus().setHeading({ level: 4 }).run();
      }
      if (value === "heading 5") {
        editor.chain().focus().setHeading({ level: 5 }).run();
      }
      if (value === "heading 6") {
        editor.chain().focus().setHeading({ level: 6 }).run();
      }
    },
    isActiveOption: editor.getAttributes("heading").level,
  },
  {
    icon: (
      <RightAlignIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: (
      <CenterAlignIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: (
      <LeftAlignIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: (
      <>
        <span>
          <ListIcon
            width={16}
            height={16}
          />
        </span>
        <span>
          {/* <ArrowIcon
            rotate={90}
            width={8}
            height={8}
            color={themeColors.colors.primary}
          /> */}
        </span>
      </>
    ),
    isListDropDown: true,
    options: [
      {
        value: "-",
      },
      {
        value: "O",
      },
    ],
    dropDownAction: () => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    icon: (
      <>
        <span>
          <OrderedListIcon
            width={16}
            height={16}
          />
        </span>
        <span>
          {/* <ArrowIcon
            rotate={90}
            width={8}
            height={8}
            color={themeColors.colors.primary}
          /> */}
        </span>
      </>
    ),
    isListDropDown: true,
    options: [
      {
        value: "1",
      },
      {
        value: "A",
      },
      {
        value: "a",
      },
      {
        value: "I",
      },
      {
        value: "i",
      },
    ],
    dropDownAction: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: (
      <LeftTabIcon
        width={16}
        height={16}
      />
    ),
    action: () =>
      editor
        .chain()
        .focus("end")
        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: (
      <RightTabIcon
        width={16}
        height={16}
      />
    ),
    action: () =>
      editor
        .chain()
        .focus("start")
        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: (
      <UndoIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: (
      <RedoIcon
        width={16}
        height={16}
      />
    ),
    action: () => editor.chain().focus().redo().run(),
  },
  {
    icon: (
      <ImageIcon
        width={16}
        height={16}
      />
    ),
    action: () => insertImage(editor),
  },
];

export default ReformulateToolbar;

// function exportEditorContentAsPDF(editorContent) {
//   const pdf = new jsPDF();

//   const myFont = "../../fonts/GESSTwoMedium-Medium.ttf";
//   pdf.addFileToVFS("MyFont.ttf", myFont);
//   pdf.addFont("MyFont.ttf", "MyFont", "normal");
//   pdf.setFont("MyFont");
//   pdf.text(editorContent, 10, 10);
//   pdf.save("editor_content.pdf");
// }

function exportEditorContentAsPDF(editorContent) {
  const pdf = new jsPDF();

  // Load the Google Font manually and include it in your project
  const myFont = "../../fonts/GESSTwoMedium-Medium.ttf";

  // Add the font to jsPDF
  pdf.addFileToVFS("GESSTwoMedium-Medium.ttf", myFont);
  pdf.addFont("GESSTwoMedium-Medium.ttf", "YourFont", "normal");
  pdf.setFont("YourFont");

  // Add text to the PDF
  pdf.text(editorContent, 10, 10);

  // Save the PDF
  pdf.save("editor_content.pdf");
}
