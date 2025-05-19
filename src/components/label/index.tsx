import { useThemeContext } from "context/theme";
import { ThemeType } from "context/type";

type Props = {
  title: string;
  className?: string;
};

export const Label: React.FC<Props> = ({ title, className }) => {
  const { theme } = useThemeContext();
  return (
    <p
      className={`${
        theme === ThemeType.DARK ? "text-[#fff]" : "text-[#475467]"
      } ${className}`}
    >
      {title}
    </p>
  );
};
