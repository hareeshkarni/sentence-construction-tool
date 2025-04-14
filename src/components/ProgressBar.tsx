import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const value = ((current + 1) / total) * 100;
  return (
    <div className="max-w-xl mx-auto mb-4">
      <div className="text-center font-medium mb-2">
        Question {current + 1} of {total}
      </div>
      <Progress value={value} className="transition-all duration-300" />
    </div>
  );
};

export default ProgressBar;