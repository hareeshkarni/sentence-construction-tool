import { useLocation, useNavigate } from "react-router-dom";
import FeedbackScreen from "@/components/FeedbackScreen";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, userAnswers } = location.state || {};

  useEffect(() => {
    if (!questions || !userAnswers) {
      navigate("/");
    }
  }, [questions, userAnswers, navigate]);

  if (!questions || !userAnswers) return null;

  const results = questions.map((q: any, i: number) => ({
    question: q.question,
    correctAnswer: q.correctAnswer,
    userAnswer: userAnswers[i],
  }));

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-100">
    <Card className="w-full max-w-4xl bg-white shadow-lg rounded-xl border border-gray-200 px-6 py-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-green-700">
          🎉 Your Results
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        <FeedbackScreen results={results} onRestart={() => navigate("/")} />
      </CardContent>
    </Card>
  </div>
  );
};

export default Result;
