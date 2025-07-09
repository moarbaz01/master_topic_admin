import { Input } from "@/components/ui/input";
import { MediaSelectInput } from "@/components/media-select"; // make sure this exists
import { Label } from "@/components/ui/label";

type OptionType = "text" | "image" | "audio";

interface OptionFieldProps {
  type: OptionType;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  index: number;
}

const OptionField = ({
  type,
  value,
  onChange,
  label,
  index,
}: OptionFieldProps) => {
  switch (type) {
    case "text":
      return (
        <div className="space-y-2">
          {label && <Label>{label}</Label>}
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      );

    case "image":
    case "audio":
      return (
        <MediaSelectInput
          label={label}
          value={value}
          onChange={onChange}
          title={`Select Option ${index + 1}`}
          variant="card"
          //   type={type} // Optional: for internal logic
        />
      );

    default:
      return null;
  }
};

export default OptionField;
