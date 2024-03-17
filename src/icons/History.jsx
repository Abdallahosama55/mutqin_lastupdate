import { themeColors } from "../theme";

const HistoryIcon = ({
  color = themeColors.colors.primary,
  width = 32,
  height = 32,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="17.5" cy="16.5" r="10.5" fill="white" />
      <path
        d="M17.6794 4.00075C10.8927 3.81408 5.33272 9.26741 5.33272 16.0007H2.94606C2.34606 16.0007 2.05272 16.7207 2.47939 17.1341L6.19939 20.8674C6.46606 21.1341 6.87939 21.1341 7.14606 20.8674L10.8661 17.1341C10.9582 17.0401 11.0204 16.9209 11.045 16.7916C11.0695 16.6623 11.0552 16.5286 11.0039 16.4074C10.9525 16.2862 10.8665 16.1829 10.7565 16.1105C10.6466 16.0382 10.5177 16 10.3861 16.0007H7.99939C7.99939 10.8007 12.2394 6.60075 17.4661 6.66741C22.4261 6.73408 26.5994 10.9074 26.6661 15.8674C26.7327 21.0807 22.5327 25.3341 17.3327 25.3341C15.1861 25.3341 13.1994 24.6007 11.6261 23.3607C11.3707 23.1596 11.0503 23.0593 10.7257 23.0789C10.4012 23.0986 10.0953 23.2369 9.86606 23.4674C9.30606 24.0274 9.34606 24.9741 9.97272 25.4541C12.0676 27.1107 14.662 28.0084 17.3327 28.0007C24.0661 28.0007 29.5194 22.4407 29.3327 15.6541C29.1594 9.40075 23.9327 4.17408 17.6794 4.00075ZM16.9994 10.6674C16.4527 10.6674 15.9994 11.1207 15.9994 11.6674V16.5741C15.9994 17.0407 16.2527 17.4807 16.6527 17.7207L20.8127 20.1874C21.2927 20.4674 21.9061 20.3074 22.1861 19.8407C22.4661 19.3607 22.3061 18.7474 21.8394 18.4674L17.9994 16.1874V11.6541C17.9994 11.1207 17.5461 10.6674 16.9994 10.6674Z"
        fill={color}
      />
    </svg>
  );
};

export default HistoryIcon;
