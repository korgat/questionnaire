"use client";

import { cn } from "@/lib/utils";
import { Option } from "@/types/questionnaire";
import OptionButton from "./OptionButton";

interface RadioQuestionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  questionId: string;
  options?: Option[];
  onAnswer: (id: string, value: string) => void;
  currentAnswer?: string;
}

const RadioQuestion = (props: RadioQuestionProps) => {
  const {
    className = "",
    title,
    description,
    options,
    questionId,
    currentAnswer,
    onAnswer,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      className={cn("flex justify-center flex-grow pt-10", {}, [className])}
    >
      <div className="max-w-96 w-full px-4">
        <h2 className="text-xl md:text-2xl leading-7 md:leading-6 font-bold text-gray-900 first-letter:uppercase">
          {title}
        </h2>
        {description && <p className="text-gray-600 mt-5">{description}</p>}
        <ul className="space-y-3 mt-8">
          {options?.map((option) => (
            <li key={option.value}>
              <OptionButton
                iconSrc={option.icon}
                label={option.label}
                isActive={currentAnswer === option.value}
                onClick={() => onAnswer(questionId, option.value)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RadioQuestion;
