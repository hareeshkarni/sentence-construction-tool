import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SentenceQuestion from "@/components/SentenceQuestion";
import Timer from "@/components/Timer";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Question {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([]);
  const [canProceed, setCanProceed] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/questions");
        const json = await res.json();
        setQuestions(json);
        setUserAnswers(new Array(json.length).fill([]));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };
    fetchData();
  }, []);

  const handleFilled = (answer: string[]) => {
    setCurrentAnswer(answer);
    setCanProceed(true);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = currentAnswer;
    setUserAnswers(updatedAnswers);

    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setCurrentAnswer([]);
      setCanProceed(false);
    } else {
      navigate("/result", {
        state: {
          questions,
          userAnswers: updatedAnswers,
        },
      });
    }
  };

  const handleTimeUp = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] =
      currentAnswer.length === 4 ? currentAnswer : Array(4).fill("Unanswered");

    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setUserAnswers(updatedAnswers);
      setCurrentIndex(nextIndex);
      setCurrentAnswer([]);
      setCanProceed(false);
    } else {
      navigate("/result", {
        state: {
          questions,
          userAnswers: updatedAnswers,
        },
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-xl">⏳ Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
  <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-100">
    <Card className="w-full max-w-4xl bg-white shadow-lg rounded-xl border border-gray-200">
      <CardHeader className="pb-4 border-b">
        <div className="flex justify-between items-center">
          <ProgressBar current={currentIndex} total={questions.length} />
          <Timer onTimeUp={handleTimeUp} keyTrigger={currentIndex} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <SentenceQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          onFilled={handleFilled}
        />
        <div className="text-center">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="px-6 py-3 text-lg w-full sm:w-auto"
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default Quiz;
