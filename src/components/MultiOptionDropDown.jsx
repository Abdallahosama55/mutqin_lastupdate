import { Stack } from "react-bootstrap";

const MultiOptionDropDown = ({
  options,
  isActive,
  dropDownAction,
  top = false,
  onClose,
}) => {
  return (
    <Stack
      className={`position-absolute translate-middle z-3 ${
        top ? "bottom-100 mb-4" : "top-50"
      } start-50 rounded-3 border overflow-hidden drop-down border bg-light max-content`}
    >
      {options?.map((option, index) => {
        return (
          <Stack
            key={index}
            className={`p-2 align-items-center button-fontSize justify-content-center position-relative fs-5 w-100 max-content ${
              (isActive === index || isActive === option.value) &&
              "border border-primary fw-medium rounded text-primary bg-light"
            } ${option.className}`}
            role="button"
            onClick={() => {
              dropDownAction && dropDownAction(option.value);
            }}
          >
            {option.value}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MultiOptionDropDown;
