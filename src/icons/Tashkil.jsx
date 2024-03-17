import { themeColors } from "../theme";

function TashkilIcon({
  color = themeColors.colors.primary,
  width = 24,
  height = 24,
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="5.69795" fill="white" />
      <path
        d="M8.416 17.632C7.136 17.632 6.288 17.216 5.872 16.384C5.456 15.52 5.248 14.608 5.248 13.648C5.248 13.296 5.264 12.928 5.296 12.544C5.36 12.128 5.44 11.664 5.536 11.152L7.936 10.48C7.84 11.024 7.76 11.536 7.696 12.016C7.664 12.464 7.648 12.864 7.648 13.216C7.648 13.824 7.744 14.272 7.936 14.56C8.128 14.848 8.432 14.992 8.848 14.992C9.328 14.992 9.728 14.752 10.048 14.272C10.368 13.76 10.544 12.752 10.576 11.248L10.576 9.808L12.88 8.944L12.88 11.872C12.88 12.32 12.96 12.72 13.12 13.072C13.312 13.392 13.696 13.552 14.272 13.552C14.848 13.552 15.232 13.376 15.424 13.024C15.616 12.672 15.712 12.224 15.712 11.68C15.712 11.136 15.648 10.592 15.52 10.048C15.392 9.472 15.216 8.912 14.992 8.368L17.152 7.696C17.472 8.304 17.728 9.008 17.92 9.808C18.144 10.576 18.256 11.28 18.256 11.92C18.256 12.976 17.952 13.936 17.344 14.8C16.768 15.632 15.856 16.048 14.608 16.048C13.616 16.048 12.8 15.792 12.16 15.28C11.552 14.736 11.248 14.096 11.248 13.36L12.352 13.792C12.352 14.88 11.968 15.792 11.2 16.528C10.464 17.264 9.536 17.632 8.416 17.632Z"
        fill={color}
      />
    </svg>
  );
}

export default TashkilIcon;
