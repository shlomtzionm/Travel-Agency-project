import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./InputFileUpload.css";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type InputFileUploadProps = {
  setImage: (file: File) => void;
};

export default function InputFileUpload(props: InputFileUploadProps) {
  return (
    <div className="UploadInput">
      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={event => {
            const file = event.target.files[0];
            props.setImage(file);
          }}
          multiple={false}
        />
      </Button>
    </div>
  );
}
