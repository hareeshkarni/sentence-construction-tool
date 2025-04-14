import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeedbackScreen = ({
  results,
  onRestart,
}: {
  results: {
    question: string;
    userAnswer: string[];
    correctAnswer: string[];
  }[];
  onRestart: () => void;
}) => {
  const score = results.filter(
    (res) => JSON.stringify(res.userAnswer) === JSON.stringify(res.correctAnswer)
  ).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <h2 className="text-3xl font-bold text-center">🎉 Your Score: {score}/10</h2>

      {results.map((res, index) => {
        const isCorrect =
          JSON.stringify(res.userAnswer) === JSON.stringify(res.correctAnswer);
        return (
        <Card key={index} className={`p-4 shadow-sm border-l-4 ${isCorrect ? "border-green-500" : "border-red-500"}`}>
            <p className="mb-2 text-lg font-medium">
              <strong>Q{index + 1}:</strong> {res.question}
            </p>
            <p>
              <strong>Your Answer:</strong>{" "}
              <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                {res.userAnswer.join(", ")}
              </span>
            </p>
            {!isCorrect && (
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-700">{res.correctAnswer.join(", ")}</span>
              </p>
            )}
          </Card>
        );
      })}

      <div className="text-center mt-6">
        <Button onClick={onRestart}>🔁 Restart Quiz</Button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
