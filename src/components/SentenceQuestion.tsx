import OptionButton from "./OptionButton";
import { useEffect, useState } from "react";

interface Props {
  question: string;
  options: string[];
  onFilled: (selected: string[]) => void;
}

const SentenceQuestion = ({ question, options, onFilled }: Props) => {
  const blanksCount = 4;

  const [selectedWords, setSelectedWords] = useState<(string | null)[]>(Array(blanksCount).fill(null));
  const [remainingOptions, setRemainingOptions] = useState<string[]>(options);

  useEffect(() => {
    setSelectedWords(Array(blanksCount).fill(null));
    setRemainingOptions(options);
  }, [question, options]);

  useEffect(() => {
    if (selectedWords.every((w) => w !== null)) {
      onFilled(selectedWords as string[]);
    }
  }, [selectedWords]);

  const handleOptionClick = (word: string) => {
    const index = selectedWords.findIndex((w) => w === null);
    if (index !== -1) {
      const newWords = [...selectedWords];
      newWords[index] = word;
      setSelectedWords(newWords);
      setRemainingOptions(remainingOptions.filter((w) => w !== word));
    }
  };

  const handleBlankClick = (index: number) => {
    const word = selectedWords[index];
    if (word) {
      const newWords = [...selectedWords];
      newWords[index] = null;
      setSelectedWords(newWords);
      setRemainingOptions([...remainingOptions, word]);
    }
  };

  const renderSentence = () => {
    const parts = question.split("___________");

    return (
      <p className="text-xl flex flex-wrap gap-2 justify-center leading-relaxed text-center">
        {parts.map((part, i) => (
          <span key={`part-${i}`}>
            {part}
            {i < blanksCount && (
              <span
                onClick={() => handleBlankClick(i)}
                className={`inline-block min-w-[100px] text-center mx-1 px-3 py-1 rounded-full border-2 border-dashed cursor-pointer transition-all ${
                  selectedWords[i]
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {selectedWords[i] || "____"}
              </span>
            )}
          </span>
        ))}
      </p>
    );
  };

  return (
    <div className="space-y-8">
      <div>{renderSentence()}</div>
      <div className="flex flex-wrap justify-center gap-3">
        {remainingOptions.map((word, i) => (
          <OptionButton
            key={i}
            label={word}
            onClick={() => handleOptionClick(word)}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SentenceQuestion;
