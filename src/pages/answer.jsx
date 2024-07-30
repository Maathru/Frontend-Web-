import { useEffect, useState, useContext } from "react";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Pagination from "../components/pagination";
import { Button } from "flowbite-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, TextField } from "@mui/material";
import { errorType, Toast } from "@/components/toast";
import ForumService from "@/service/forumService";
import AnswerService from "@/service/answerService";
import { userData } from "@/context/userAuth";
import DeleteConfirmationDialog from "@/components/deleteConfirmationDialog";

const badgeColor = "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";

const Answer = () => {
  const { questionId } = useParams();
  const [pageLoader, setPageLoader] = useState(true);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [yourAnswer, setYourAnswer] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control delete confirmation dialog
  const [deleteId, setDeleteId] = useState(null); 
  const navigate = useNavigate();
  const { userDetails } = useContext(userData);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await ForumService.getQuestion(questionId);
        setQuestion(response);
      } catch (error) {
        const data = error.response.data;
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    const fetchAnswersByQuestion = async () => {
      try {
        const response = await AnswerService.getAnswersByQuestion(questionId);
        setAnswers(response);
      } catch (error) {
        const data = error.response.data;
        Toast(data || "Error occurred", errorType.ERROR);
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
      setYourAnswer("");
    } catch (error) {
      const data = error.response.data;
      Toast(data || "Error occurred", errorType.ERROR);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await ForumService.deleteQuestion(id);
      Toast(response, errorType.SUCCESS);
      navigate("/forum");
    } catch (error) {
      const data = error.response.data;
      Toast(data || "Error occurred", errorType.ERROR);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1">
        <div className="row-span-2">
          <div className={`flex flex-col justify-between h-[100%]`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold items-center text-neutral-800 dark:text-neutral-100">
                  <IoIosArrowBack
                    size={45}
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                  <div className="ml-3 text-4xl">{question.title}</div>
                </CardTitle>
                <CardDescription className="md:mt-12 mt-8 ml-20 flex gap-9">
                  <div>Asked On: {question.createdAt}</div>
                  <div>Answers: {answers.length}</div>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm ml-20">
                <div
                  className="question-description"
                  dangerouslySetInnerHTML={{ __html: question.description }}
                />
                <div className="pb-5 my-5">
                  <div className="flex justify-between">

                    {/* Keywords */}
                    <div>

                      {question.keywords &&
                        question.keywords.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={badgeColor}
                          >
                            {keyword}
                          </Badge>
                        ))}
                    </div>

                    {/* Edit delete actions */}
                    <div>

                      {userDetails.userId == question.authorId && (
                        <div className="flex gap-5 items-center">
                          <Link to={`/forum/edit/` + question.id} className="mx-auto font-medium text-base text-[#9C33C1]">
                            Edit question
                          </Link>
                          <div onClick={() => confirmDelete(questionId)}  className="mx-auto font-medium text-base text-red-600 cursor-pointer">
                            Delete question
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Author details */}
                    <div className="flex ml-auto items-center gap-1">
                      <Avatar
                        alt="Remy Sharp"
                        src="src/assets/nav/sample-profile.png"
                      />
                      <div className="ml-auto items-center">
                        <Link>
                          {question.authorName
                            ? `${question.authorName}`
                            : "Unknown"}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {question.updatedAt
                            ? `Modified at ${question.updatedAt}`
                            : `Asked at ${question.createdAt}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 ml-20">
        <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          Answers: {answers.length}
        </CardTitle>

        {answers.map((answer) => (
          <div key={answer.id} className="my-3">
            <CardContent>
              <div className="flex gap-3">
                <div
                  className="question-description"
                  dangerouslySetInnerHTML={{ __html: answer.answer }}
                />
              </div>
            </CardContent>
            <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
              {userDetails.userId === answer.authorId && (
                <Link className="ml-auto mr-auto">Edit</Link>
              )}
              <div className="flex ml-auto items-center gap-1">
                <Avatar
                  alt="Remy Sharp"
                  src="src/assets/nav/sample-profile.png"
                />
                <div className="ml-auto items-center">
                  <Link>
                    {answer.authorName ? `${answer.authorName}` : "Unknown"}
                  </Link>
                  <div className="text-sm text-gray-500">
                    {answer.updatedAt
                      ? `Modified at ${answer.updatedAt}`
                      : `Answered at ${answer.createdAt}`}
                  </div>
                </div>
              </div>
            </CardFooter>
          </div>
        ))}

        {userDetails ? (
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
        ) : (
          <div className="text-center mt-5">Please login to answer the question</div>
        )}
      </div>
      
      <Pagination />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        handleDelete={() => handleDelete(deleteId)}
      />

    </div>
  );
};

export default Answer;
