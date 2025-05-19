
import BraftEditor from "braft-editor";
import { FC } from "react";

const TextEditorForm: FC<{
  value: string;
  setValue: (data: any) => void;
  disabled?: boolean;
  language: any;

}> = ({ value, disabled = false, setValue, language }) => {
  return (
    <BraftEditor
      value={value as any}
      onChange={disabled ? () => { } : setValue}
      style={{
        border: "1px solid #E6E6FA",
        borderRadius: "4px",
        backgroundColor: "#fff",
      }}
      language={language === "mn" ? "en" : language}
    />
  );
};

export default TextEditorForm;
