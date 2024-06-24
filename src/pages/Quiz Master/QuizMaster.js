import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import logo from "../../assets/images/logo.png";
import quiz_star from "../../assets/images/quiz-star.png";
import quiz_enter from "../../assets/images/quiz-enter.png";
import quiz_logout from "../../assets/images/quiz-logout.png";
import quiz_mike from "../../assets/images/quiz-mike.png";
import SetAlert from "../../components/common/SetAlert";
import { useNavigate } from "react-router-dom";
import {
  setQuizFirst,
  setQuizSecond,
  setQuizThird,
} from "../../store/Quiz/action";
import { useDispatch } from "react-redux";
import { handleDynamicRequestHeader } from "../../components/common/DyanamicRequest";
import { BASE_URL } from "../../components/common/AppConfig";
import { useSelector } from "react-redux";
// import { Draggable } from 'react-drag-reorder';
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { Audio } from "react-loader-spinner";
import { setActiveLink } from "../../store/Link/action";
import SpacebugPopup from "../../assets/images/spacebug-popup.svg";
import { Rating } from "@mui/material";
function QuizMaster() {
  const [startTest, setStartTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questionsQuizFirst, setQuestionsQuizFirst] = useState([]);
  const [questionsQuizSecond, setQuestionsQuizSecond] = useState([]);
  const [questionsQuizThird, setQuestionsQuizThird] = useState([]);
  const [testName, setTestName] = useState("");
  const [progressWidth, setProgressWidth] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizNumberEncoded = window.location.pathname.split("/").pop();
  const decodedValue = atob(quizNumberEncoded);
  const quizNumber = decodedValue.split("_")[0];
  const [selectedOption, setSelectedOption] = useState([]);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [dragOptions, setDragOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [startQuestions, setStartQuestion] = useState([]);
  const [testDataId, setStateDataId] = useState([]);
  const [showStart, setShowStart] = useState(false);
  const [loader, setLoader] = useState(true);
  const [alertMessage, setAlertMessage] = useState({ success: "", error: "" });
  const [testDetails, setTestDetails] = useState({});
  const userToken = useSelector((state) => state.roleReducer.jwtToken);
  const testID = useSelector((state) => state.quizReducer.testID);
  const [testData, setTestData] = useState([
    {
      id: "",
      testId: "",
      answer: "",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [isNextGenStudent, setIsNextGenStudent] = useState(false);
  const [rating, setRating] = useState(0);
  const quizFirst = useSelector((state) => state.quizReducer.quizFirst);
  const quizSecond = useSelector((state) => state.quizReducer.quizSecond);
  const quizThird = useSelector((state) => state.quizReducer.quizThird);
  const [assigments, setAssigments] = useState(0);
  const [finalPopup, setFinalPopup] = useState(false);
  console.log("check number of test completed : ", assigments);

  useEffect(() => {
    setAssigments(quizFirst + quizSecond + quizThird);
  }, [quizFirst, quizSecond, quizThird]);

  const openModel = async () => {
    setIsOpen(true);
  };

  const closeModel = async () => {
    setIsOpen(false);
    setFeedbackOpen(false);
    const requestBody = {};
    const method = "POST";
    const url = `${BASE_URL}/mobile/getTestStatus`;
    const token = await userToken;
    const wrongResponse = () => {
      setAlertMessage({ success: "", error: "Unable to fetch parameters" });
    };
    const rightResponse = async (data) => {
      const test1 = await data.test1.status;
      const test2 = await data.test2.status;
      const test3 = await data.test3.status;

      if (test1) {
        dispatch(setQuizFirst(true));
      }
      if (test2) {
        dispatch(setQuizSecond(true));
      }
      if (test3) {
        dispatch(setQuizThird(true));
      }
    };
    await handleDynamicRequestHeader(
      method,
      url,
      requestBody,
      token,
      wrongResponse,
      rightResponse
    );
    setLoader(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const openFeedbackModel = async () => {
    setFeedbackOpen(true);
  };

  const checkNextGenStudent = async () => {
    const requestBody = {};
    const method = "POST";
    const url = `${BASE_URL}/mobile/profileDetails`;
    const token = userToken;

    const wrongResponse = () => {
      setAlertMessage({ success: "", error: "Unable to fetch parameters" });
    };

    const rightResponse = (data) => {
      setIsNextGenStudent(data.student.nextGenStatus);
    };

    handleDynamicRequestHeader(
      method,
      url,
      requestBody,
      token,
      wrongResponse,
      rightResponse
    );
  };

  const handleUserTest = async (testId) => {
    setLoader(true);
    window.scrollTo(0, 0);
    const requestBody = { id: testId };
    const method = "POST";
    const url = `${BASE_URL}/mobile/getTestQues`;
    const token = userToken;

    const wrongResponse = () => {
      setLoader(false);
      setAlertMessage({ success: "", error: "Unable to fetch parameters" });
      dispatch(setActiveLink("Home"));
      navigate("/dashboard");
    };

    const rightResponse = (data) => {
      setSubmittedAnswer(data.done);
      const answerSubmitted = data.done;
      if (answerSubmitted === data.test.numberQues) {
        setLoader(true);
        dispatch(setActiveLink("Home"));
        navigate("/dashboard");
      }
      setStateDataId(data.test._id);
      const updatedQuestionsQuiz = data.test.questions;
      setStartQuestion(updatedQuestionsQuiz[0]);

      if (quizNumber === "1") {
        setQuestionsQuizFirst(updatedQuestionsQuiz);
      } else if (quizNumber === "2") {
        setQuestionsQuizSecond(updatedQuestionsQuiz);
      } else if (quizNumber === "3") {
        setQuestionsQuizThird(updatedQuestionsQuiz);
      }

      setQuestions(() => {
        if (answerSubmitted === 0) {
          const updatedQuestions = updatedQuestionsQuiz;
          return updatedQuestions;
        } else {
          const updatedQuestions = updatedQuestionsQuiz.slice(answerSubmitted);
          console.log((answerSubmitted / updatedQuestionsQuiz?.length) * 100);
          setProgressWidth(
            (answerSubmitted / updatedQuestionsQuiz?.length) * 100
          );
          setStartTest(true);
          return updatedQuestions;
        }
      });
      setLoader(false);
    };

    handleDynamicRequestHeader(
      method,
      url,
      requestBody,
      token,
      wrongResponse,
      rightResponse
    );
  };

  useEffect(() => {
    if (quizNumber === "1") {
      handleUserTest(testID);
      setTestName("first");
    } else if (quizNumber === "2") {
      handleUserTest(testID);
      setTestName("second");
    } else if (quizNumber === "3") {
      handleUserTest(testID);
      setTestName("third");
    }
    handleAnswerSelection();
    checkNextGenStudent();
  }, []);

  useEffect(() => {

  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questions]);

  const handleStartTest = async () => {
    window.scrollTo(0, 0);
    const nextAnswer = 1;
    const updatedTestData = {
      testId: testDataId,
      id: questions[currentQuestion]._id,
      answer: selectedOption === "statement" ? "" : selectedOption,
    };
    await setTestData(updatedTestData);
    await submitAnswer(updatedTestData);

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setDragOptions([]);
    }

    handleAnswerSelection(nextAnswer);
    setStartTest(true);
  };

  const handleEndTest = () => {
    navigate("/dashboard");
  };

  const handleNext = async () => {
    await setTimeout(() => {
      setLoader(true);
      window.scrollTo(0, 0);
      setLoader(false);
    }, 50);
    setLoader(false);
    await new Promise((resolve) => {
      window.scrollTo(0, 0);
      setTimeout(resolve, 10); // Introduce a small delay
    });
    const nextAnswer = 1;
    const updatedTestData = {
      testId: testDataId,
      id: questions[currentQuestion]._id,
      answer: selectedOption === "statement" ? "" : selectedOption,
    };
    await setTestData(updatedTestData);
    await submitAnswer(updatedTestData);

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setDragOptions([]);
    }

    handleAnswerSelection(nextAnswer);
  };
  const submitAnswer = async (updatedTestData) => {
    const requestBody = updatedTestData;
    const method = "POST";
    const url = `${BASE_URL}/mobile/addTestAnswer`;
    const token = userToken;
    const wrongResponse = () => {
      setAlertMessage({ success: "", error: "Unable to fetch parameters" });
    };
    const rightResponse = (data) => {};
    handleDynamicRequestHeader(
      method,
      url,
      requestBody,
      token,
      wrongResponse,
      rightResponse
    );
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerSelection = (answer) => {
    window.scrollTo(0, 0);
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    setProgressWidth(
      ((currentQuestion + 1 + submittedAnswer) / totalQuestions) * 100
    );
  };
  const totalQuestions = questions?.length + submittedAnswer - 1;

  let currentQuestionNumber = 0;

  if (startTest) {
    currentQuestionNumber = currentQuestion + submittedAnswer;
  }

  const answeredQuestionsCount =
    selectedAnswers.filter((answer) => answer !== undefined)?.length +
    submittedAnswer;
  const allQuestionsAnswered = answeredQuestionsCount === totalQuestions;

  // const handleSubmit =async () => {
  //     const updatedTestData = {
  //         testId: testDataId,
  //         id: questions[currentQuestion]._id,
  //         answer: selectedOption === 'statement' ? '' : selectedOption
  //       };
  //       const requestBody = updatedTestData;
  //       const method = 'POST';
  //       const url = `${BASE_URL}/mobile/addTestAnswer`;
  //       const token = userToken;
  //       const wrongResponse = () => {
  //           setAlertMessage({ success: '', error: 'Something went wrong' });
  //       }
  //       const rightResponse = (data) => {
  //       }
  //       handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
  //       await setTestData(updatedTestData);
  //     if (allQuestionsAnswered) {

  //             const requestBody = {  };
  //             const method = 'POST';
  //             const url = `${BASE_URL}/mobile/getTestStatus`;
  //             const token =await userToken;
  //             const wrongResponse = () => {
  //                 setAlertMessage({ success: '', error: 'Something went wrong' });
  //             }
  //             const rightResponse = (data) => {
  //                const test1=data.test1.status;
  //                const test2=data.test2.status;
  //                const test3=data.test3.status;

  //               if(test1) {
  //                 dispatch(setQuizFirst(true));
  //                 await addFirstSpaceBucks();
  //               } if(test2){
  //                 dispatch(setQuizSecond(true));
  //                 addSecoundSpaceBucks();
  //               }if(test3){
  //                 dispatch(setQuizThird(true));
  //                 addThirdSpaceBucks();
  //               }

  //             };
  //             handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
  //             setLoader(true);
  //             setTimeout(()=>{
  //                 navigate('/dashboard');
  //             },3000);
  //     }
  // };
  const handleSubmit = async () => {
    const updatedTestData = {
      testId: testDataId,
      id: questions[currentQuestion]._id,
      answer: selectedOption === "statement" ? "" : selectedOption,
    };
    const requestBody = updatedTestData;
    const method = "POST";
    const url = `${BASE_URL}/mobile/addTestAnswer`;
    const token = userToken;
    const wrongResponse = () => {
      setAlertMessage({ success: "", error: "Unable to fetch parameters" });
    };
    const rightResponse = (data) => {};
    await handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    setTestData(updatedTestData);

    if (allQuestionsAnswered) {
      if (isNextGenStudent) {
        setFeedbackOpen(true);
      } else if (assigments === 2) {
        setFinalPopup(true);
      } else {
        setIsOpen(true);
      }
    }
  };

  const handleInputChange = (value) => {
    setSelectedOption(value);
  };

  const renderBasedOnType = (option, type) => {
    switch (type) {
      case "Multi_single":
        return <>{option}</>;
      case "Short_Text":
        return (
          <input
            type="text"
            style={{
              border: "none",
              width: "100%",
              height: "40px",
              padding: 0,
              paddingLeft: "10px",
              background: "transparent",
              outline: "none",
            }}
            value={selectedOption}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );
      case "Multi_multi":
        return <>{option}</>;
      case "Number":
        return (
          <input
            type="text"
            style={{
              border: "none",
              width: "100%",
              height: "40px",
              padding: 0,
              paddingLeft: "10px",
              background: "transparent",
              outline: "none",
            }}
            value={selectedOption}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              handleInputChange(onlyNumbers); // Set the state or value to onlyNumbers
            }}
          />
        );
      case "Multi_multi":
        return <>{option}</>;

      case "Ranking":
        return <>{option}</>;
      case "Statement":
        return <></>;
      default:
        return null;
    }
  };

  const handleOptionSelect = (option) => {
    if (questions[currentQuestion].type === "Multi_multi") {
      if (selectedOption?.length < 5 || selectedOption.includes(option)) {
        const index = selectedOption.indexOf(option);

        if (index === -1 && selectedOption?.length < 5) {
          setSelectedOption([...selectedOption, option]);
        } else if (index !== -1) {
          const updatedOptions = [...selectedOption];
          updatedOptions.splice(index, 1);
          setSelectedOption(updatedOptions);
        }
      } else {
        setAlertMessage({
          success: "",
          error: "You can only select up to 5 options",
        });
      }
    } else if (questions[currentQuestion].type === "Multi_single") {
      setSelectedOption(option === selectedOption ? null : option);
    }
  };

  useEffect(() => {
    if (
      questions?.length > 1 &&
      questions[currentQuestion].type === "Ranking"
    ) {
      setDragOptions(questions[currentQuestion].options);
      if (dragOptions?.length > 0) {
        setSelectedOption(dragOptions);
      }
    }
    if (questions[currentQuestion]?.type === "Statement") {
      setSelectedOption("statement");
    }
  }, [questions, currentQuestion, selectedOption]);

  // useEffect(() => {
  // if (dragOptions?.length > 0) {
  //     setSelectedOption(dragOptions);
  // }
  // }, [selectedOption, dragOptions]);

  useEffect(() => {
    setSelectedOption([]);
    window.scrollTo(0, 0);
  }, [currentQuestion]);

  const SortableItem = sortableElement(({ value, index, indexNew }) => {
    console.log("Index:", index); // Use indexNew instead of index
    return (
      <div
        style={{ border: "2px solid #2b95f64d", borderRadius: "16px" }}
        className={`d-flex justify-content-between align-items-center ${
          questions[currentQuestion].type === "Multi_multi" &&
          selectedOption.includes(value)
            ? "ans-col btn selected-answer"
            : questions[currentQuestion].type === "Multi_single" &&
              selectedOption === value
            ? "ans-col btn selected-answer"
            : "ans-col btn"
        }`}
      >
        <div
          className="d-flex justify-content-start align-items-center"
          style={{ width: "85%", fontWeight: "700", fontSize: "20px" }}
        >
          {questions[currentQuestion].type !== "Short_Text" && (
            <div
              className="ans-list d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#2B95F6",
                borderRadius: "10px",
                width: "40px",
                height: "40px",
                color: "#fff",
                marginRight: "15px",
                minWidth: "40px",
              }}
            >
              {String.fromCharCode(65 + indexNew)}
            </div> // Use indexNew instead of index
          )}

          <div style={{ textAlign: "left", lineHeight: "22px" }}>
            {renderBasedOnType(value, questions[currentQuestion].type)}
          </div>
        </div>

        <div className="active-svg-draggable"></div>
      </div>
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // console.log('Dragging item from index', oldIndex, 'to index', newIndex);
    if (oldIndex !== newIndex) {
      const newItems = [...dragOptions];
      const movedItem = newItems.splice(oldIndex, 1)[0];
      newItems.splice(newIndex, 0, movedItem);
      setDragOptions(newItems);
    }
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const requestBody = {
      parentsName: event.target.elements.name.value,
      parentsemail: event.target.elements.email.value,
      parentsNumber: event.target.elements.mobile.value,
      northstar: event.target.elements.feedback.value,
      rating,
    };

    const method = "POST";
    const url = `${BASE_URL}/mobile/profileupdate`;
    const token = userToken;

    const wrongResponse = () => {
      setAlertMessage({ success: "", error: "Unable to fetch parameters" });
    };

    const rightResponse = (data) => {
      closeModel();
    };

    handleDynamicRequestHeader(
      method,
      url,
      requestBody,
      token,
      wrongResponse,
      rightResponse
    );
  };

  return (
    <div>
      {loader ? (
        <div className="quiz-main">
          <div className="main-dashboard">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 padding0">
                  <div
                    className="middle-quiz-sec "
                    style={{ width: "100%", height: "100vh" }}
                  >
                    <div
                      className="d-flex justify-content-center align-tem-center"
                      style={{ width: "100%" }}
                    >
                      <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="#369FFF"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-main">
          <div className="main-dashboard">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 padding0">
                  <div className="quiz-head">
                    <img src={logo} alt="" />
                    <div className="progress-sec">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${progressWidth}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="steps-count-quiz">{`${currentQuestionNumber
                      .toString()
                      .padStart(2, "0")} / ${totalQuestions
                      .toString()
                      .padStart(2, "0")}`}</span>
                  </div>
                  {!startTest && (
                    <div className="middle-quiz-sec ">
                      {startQuestions && (
                        <div style={{ width: "100%" }}>
                          <h2>Let’s get started!</h2>
                          {startQuestions.question
                            .split("\n")
                            .map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}

                          <span>
                            <img src={quiz_star} alt="quiz-star" /> Remember
                            there are no wrong answers!{" "}
                          </span>
                          <div className="button-next">
                            <button
                              onClick={handleStartTest}
                              disabled={questions?.length <= 1}
                            >
                              Start test
                            </button>
                            <a href="#" className="press-enter">
                              press <strong>Enter</strong>
                              <img src={quiz_enter} alt="quiz-enter" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {startTest && (
                    <div className="middle-quiz-sec " style={{ width: "100%" }}>
                      <div style={{ width: "100%" }}>
                        <div
                          className="question-number"
                          style={{ width: "100%" }}
                        >
                          <h2>{questions[currentQuestion]?.number}</h2>
                          {/* <p>{questions[currentQuestion].question}</p> */}
                          <p>
                            {questions[currentQuestion]?.question
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          </p>
                        </div>
                        <SetAlert
                          alertMessage={alertMessage}
                          setAlertMessage={setAlertMessage}
                        />
                        {questions[currentQuestion].type !== "Statement" && (
                          <div
                            className="qustion-row"
                            style={{ width: "100%" }}
                          >
                            {questions[currentQuestion].type !== "Ranking" ? (
                              <>
                                {questions[currentQuestion].options.map(
                                  (option, index) => (
                                    <div
                                      style={{ width: "100%" }}
                                      className={` ${
                                        questions[currentQuestion].type ===
                                          "Multi_multi" &&
                                        selectedOption.includes(option)
                                          ? "ans-col btn selected-answer"
                                          : questions[currentQuestion].type ===
                                              "Multi_single" &&
                                            selectedOption === option
                                          ? "ans-col btn selected-answer"
                                          : "ans-col btn"
                                      }`}
                                      key={index}
                                      onClick={() => handleOptionSelect(option)}
                                    >
                                      {questions[currentQuestion].type !==
                                        "Short_Text" &&
                                        questions[currentQuestion].type !==
                                          "Number" && (
                                          <>
                                            <div style={{ height: "40px" }}>
                                              {questions[currentQuestion]
                                                .type === "Multi_single" && (
                                                <div
                                                  style={{ height: "40px" }}
                                                  className="d-flex justify-content-center align-items-center"
                                                >
                                                  <input
                                                    type="radio"
                                                    checked={
                                                      selectedOption === option
                                                    }
                                                    onChange={() =>
                                                      handleOptionSelect(option)
                                                    }
                                                    style={{
                                                      marginLeft: "15px",
                                                      height: "16px",
                                                      width: "16px",
                                                      marginRight: "15px",
                                                    }}
                                                  />
                                                </div>
                                              )}
                                              {questions[currentQuestion]
                                                .type === "Multi_multi" && (
                                                <div
                                                  style={{ height: "40px" }}
                                                  className="d-flex justify-content-center align-items-center"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={
                                                      questions[currentQuestion]
                                                        .type ===
                                                        "Multi_multi" &&
                                                      selectedOption.includes(
                                                        option
                                                      )
                                                    }
                                                    style={{
                                                      marginLeft: "15px",
                                                      height: "16px",
                                                      width: "16px",
                                                      marginRight: "15px",
                                                    }}
                                                    onChange={() =>
                                                      handleOptionSelect(option)
                                                    }
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          </>
                                        )}

                                      {renderBasedOnType(
                                        option,
                                        questions[currentQuestion].type
                                      )}
                                    </div>
                                  )
                                )}
                              </>
                            ) : (
                              <>
                                {dragOptions?.length > 0 ? (
                                  <SortableContainer onSortEnd={onSortEnd}>
                                    {dragOptions.map((value, index) => (
                                      <SortableItem
                                        key={`item-${index}`}
                                        indexNew={index}
                                        index={index}
                                        value={value}
                                      /> // Ensure index prop is passed here
                                    ))}
                                  </SortableContainer>
                                ) : (
                                  <div>No options available</div>
                                )}
                              </>
                            )}
                          </div>
                        )}

                        <div className="button-next">
                          <button
                            onClick={
                              allQuestionsAnswered ? handleSubmit : handleNext
                            }
                            disabled={
                              !selectedOption ||
                              selectedOption?.length === 0 ||
                              inputValues === null
                            }
                          >
                            {allQuestionsAnswered ? "Submit" : "Next"}{" "}
                            <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="quiz-footer">
                    <a href="" onClick={handleEndTest}>
                      <img
                        className="quiz-logout"
                        src={quiz_logout}
                        alt="quiz-logout"
                      />
                      <strong>Leave</strong> this test
                    </a>
                  </div>
                  <img src={quiz_mike} alt="quiz-mike" className="quiz-mike" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          isOpen={openModel}
          toggle={openModel}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <div className=" spacebug-popup">
            <div className="modal-body">
              <img src={SpacebugPopup} />
              <div className="spacebug-content-right">
                {/* <p><strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.</p> */}
                <p>
                  <strong>Great!</strong> you have just completed your{" "}
                  {testName} test, as a reward, we are giving you 350
                  SpaceBucks. Keep giving tests to get a personlized report and
                  to unlock career options.
                </p>
                <button
                  onClick={closeModel}
                  className="okay-btn"
                  data-bs-dismiss="modal"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {finalPopup && (
        <Modal
          isOpen={setFinalPopup}
          toggle={setFinalPopup}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <div className=" spacebug-popup">
            <div className="modal-body">
              <img src={SpacebugPopup} />
              <div className="spacebug-content-right">
                {/* <p><strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.</p> */}
                <p>
                  <strong>Congratulations!</strong> you have just completed all
                  the tests, as a reward, we are giving you <b>350 SpaceBucks</b>.
                </p>
                <p>Now you can get your personlized report</p>
                <p>
                Get answers to all your career question on <b>AcadBot</b> - our AI Career Copilot!<br/><br/>
                {/* <span className=" tw-text-xs"><b>Note</b> : SpaceBucks will be deducted every month for AcadBot.</span> */}
                </p>
                <div>
                  <button onClick={closeModel} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {isFeedbackOpen && (
        <Modal
          isOpen={openFeedbackModel}
          toggle={openFeedbackModel}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <div className="feedback-popup">
            <div className="modal-header">
              <div>
                <h2 className="modal-title fw-bold ">
                  Congratulations on reaching the finish line👏
                </h2>
                <p>Help us with your feedback.</p>
              </div>
              {/* <button type="button" className="btn-close-feedback" onClick={closeModel}></button> */}
            </div>
            <div className="modal-body">
              <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                <div className="feedback-form-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="mobile" className="form-label">
                        Mobile No:
                      </label>
                      <input type="tel" className="form-control" id="mobile" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="feedback" className="form-label">
                      How likely are you to recommend AcadSpace tests for career
                      counselling students?
                    </label>
                    <Rating
                      name="customized-10"
                      defaultValue={0}
                      max={10}
                      onChange={(event, newValue) => setRating(newValue)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="feedback" className="form-label">
                      Any specific career/education requirement for which you
                      want us to help you?
                    </label>
                    <textarea
                      className="form-control"
                      id="feedback"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="feedback-okay-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default QuizMaster;
