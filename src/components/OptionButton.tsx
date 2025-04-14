import { Button } from "@/components/ui/button";

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, isSelected, onClick }) => {
  return (
        <Button
        onClick={onClick}
        variant={isSelected ? "default" : "outline"}
        className={`m-2 px-4 py-2 rounded-full text-base transition-all duration-200 ${
          isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-100"
        } capitalize`}
      >
        {label}
      </Button>  

  );
};

export default OptionButton;
