import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-100">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl border border-gray-200 px-6 py-8 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">🧠 Sentence Construction Tool</CardTitle>
        </CardHeader>
        <CardContent className="text-lg space-y-6">
          <p className="text-muted-foreground">
            Test your grammar and vocabulary by completing 10 dynamic sentences. Ready?
          </p>
          <Button onClick={() => navigate("/quiz")} className="px-6 py-3 w-full text-lg">
            Start Test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
