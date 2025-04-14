import { useEffect, useState } from "react";

const Timer = ({
  duration = 30,
  onTimeUp,
  keyTrigger,
}: {
  duration?: number;
  onTimeUp: () => void;
  keyTrigger: any;
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onTimeUp();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [keyTrigger]);

  return (
    <div className="text-lg font-semibold bg-white px-4 py-2 rounded-md shadow border text-blue-600">
      ⏱️ {timeLeft}s left
    </div>
  );
};

export default Timer;
