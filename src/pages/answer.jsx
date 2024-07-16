import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../components/pagination";
import { Button } from "flowbite-react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSolidLike, BiDislike } from "react-icons/bi";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, TextField } from "@mui/material";

import { errorType, Toast } from "@/components/toast";
import ForumService from "@/service/forumService";
import AnswerService from "@/service/answerService";

const cardColor = "bg-pink-100 dark:bg-[#251F28] hover:dark:bg-[#1D1A1F]";
const badgeColor =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";
const readMoreColor = "text-[#9c3cc1] dark:text-neutral-300";

const Answer = () => {
  const { questionId } = useParams();
  const [pageLoader, setPageLoader] = useState(true);

  // Mock data for demonstration
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const [yourAnswer, setYourAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await ForumService.getQuestion(questionId);
        setQuestion(response);
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    const fetchAnswersByQuestion = async () => {
      try {
        const response = await AnswerService.getAnswersByQuestion(questionId);
        setAnswers(response);
        console.log(response);
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchAnswersByQuestion();
  }, [pageLoader, questionId]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const data = {
      answer: yourAnswer,
      question: questionId,
    };

    try {
      const response = await AnswerService.addAnswer(data);
      Toast(response, errorType.SUCCESS);
      setPageLoader((pre) => !pre);
    } catch (error) {
      console.log(error.message);
      Toast(error.message, errorType.ERROR);
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1">
        <div className="row-span-2">
          <div className={` flex flex-col justify-between h-[100%]`} variant="">
            <CardHeader>
              <CardTitle className="flex md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold items-center text-neutral-800 dark:text-neutral-100">
                <MdOutlineArrowBackIosNew />
                <p className="ml-3 text-4xl"> {question.title}</p>
              </CardTitle>
              <CardDescription className="md:mt-12 mt-8 ml-20 flex gap-9">
                <div>Asked On : {question.createdAt}</div>
                <div>Answers : {question.answers}</div>
                <div>Viewed : {question.views} times</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm ml-20">
              <div
                className="question-description"
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
              <div className="pb-5 my-5">
                <div className="flex gap-2 justify-between items-center">
                  <Badge variant="secondary" className={badgeColor}>
                    Prenatal Nutrition
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Meal Plan
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Dietary Tips
                  </Badge>
                  <Link to="/forum/question" className="mx-auto">
                    Edit the question
                  </Link>
                  <div className="flex ml-auto items-center gap-1">
                    <Avatar
                      alt="Remy Sharp"
                      src="src/assets/nav/sample-profile.png"
                    />
                    <div className="ml-auto items-center ">
                      <Link>
                        {question.authorName
                          ? `${question.authorName}`
                          : "Unknown"}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Modified on {question.modifiedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 ml-20">
        <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          Answers :
        </CardTitle>

        {answers.map((answer) => (
          <div key={answer.id} className="my-3">
            <CardContent>
              <div className="flex gap-3">
                <div className="items-center gap-2">
                  <BiSolidLike size="3.5rem" />
                  <BiDislike size="3.5rem" />
                </div>
                <div
                  className="question-description"
                  dangerouslySetInnerHTML={{ __html: answer.answer }}
                />
              </div>
            </CardContent>
            <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
              <Link>Edit</Link>
            </CardFooter>
          </div>
        ))}

        <div className="flex mt-5 gap-5">
          <TextField
            value={yourAnswer}
            onChange={(e) => setYourAnswer(e.target.value)}
            id="outlined-basic"
            label="Add Your Answer"
            variant="outlined"
            className="w-[80%]"
          />
          <Button
            onClick={handleAnswerSubmit}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </Button>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default Answer;
