import React, { useState, useEffect } from "react";
import RealTimeData from "./RealTimeData";
import Header from "./Header";
import crossWalk from "./cross-walk.png";
import person from "./Person.png";
import FeedbackDialog from "./FeedbackDialog";

const Traffic = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [activeLight, setActiveLight] = useState("red");
  const [crossedSignal, setCrossedSignal] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleSubmitFeedback = (formData) => {
    // Handle form submission logic here
    console.log("Feedback form data:", formData);
    // Close the dialog after submission
    handleCloseDialog();
  };

  const stopSound = require("./Red.mp3");
  const waitSound = require("./Yellow.mp3");
  const proceedSound = require("./Green.mp3");
  const successSound = require("./Successfully.mp3");

  const changeLight = () => {
    setActiveLight((prevLight) => {
      switch (prevLight) {
        case "red":
          return "yellow";
        case "yellow":
          return "green";
        case "green":
          return "red";
        default:
          return "red";
      }
    });
  };

  const startLightChange = () => {
    const intervalId = setInterval(changeLight, 10000); // Change light every 10 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  };
  const playSuccessSound = () => {
    const audio = document.getElementById("successAudio");
    if (audio && successSound) {
      audio.src = successSound.default; // Use .default to access the imported file
      audio.play();
    } else {
      console.error("Error: Audio element or success sound file not found.");
    }
  };
  const handleActivateSignal = () => {
    setButtonClicked(true);
    startLightChange();
    // Display "You've Crossed the Signal Successfully" every 25 seconds
    setInterval(() => {
      setCrossedSignal(true);
      setTimeout(() => {
        setCrossedSignal(false);
      }, 5000); // Hide the message after 5 seconds
    }, 28000);
  };

  const handleButtonClick = () => {
    setButtonClicked(false);
    setActiveLight("red");
    setCrossedSignal(false);
  };

  const playAudio = (activeLight) => {
    const audio = document.getElementById("trafficAudio");
    switch (activeLight) {
      case "red":
        audio.src = stopSound;
        alert("It is red signal and you cannot cross");
        break;
      case "yellow":
        audio.src = waitSound;
        alert("It is yellow signal, please wait");
        break;
      case "green":
        audio.src = proceedSound;
        alert("It is green signal, you can cross");
        break;
      default:
        break;
    }
    audio.play();
  };

  const h1Text =
    activeLight === "red"
      ? "Stop! Do not cross."
      : activeLight === "yellow"
      ? "Be ready to wait."
      : "You can cross now.";

  const randomSteps = Math.floor(Math.random() * (80 - 30 + 1)) + 30;
  const randomSeconds = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

  return (
    <div className="bg-green-200 md:h-[100%] h-lvh">
      {!buttonClicked ? (
        <>
          <Header />
          <button
            onClick={handleActivateSignal}
            className="md:p-4 p-4 m-4 md:m-4 rounded-lg bg-sky-700 text-white md:absolute absolute top-[40px] md:top-[40px]"
          >
            Activate Signal
          </button>
          <div className="pl-4 md:absolute absolute top-[150px] md:top-[150px]">
            <RealTimeData />
            <button
              onClick={() => (window.location.href = "tel:839-810-7499")}
              className="p-2 mt-2 bg-red-400 rounded-lg text-black"
            >
              Emergency Helpline!
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-3xl text-center m-2 p-2">Pedestrian System</h1>{" "}
            <button
              className="p-4 m-4 bg-red-400 rounded-full text-black"
              allow="autoplay;"
              onClick={handleButtonClick}
            >
              X
            </button>
          </div>
          <div className="flex justify-between">
            <audio id="trafficAudio"></audio>
            <button
              onClick={() => playAudio(activeLight)}
              className="bg-red-400 mx-4 my-4 px-4 py-4 md:mx-4 md:my-2 md:px-4 md:py-2 text-white rounded-md"
            >
              Walk
            </button>{" "}
          </div>

          <h2 className="text-2xl text-sky-600 text-center">{h1Text}</h2>

          <div className="">
            {activeLight === "green" && (
              <div>
                <p className="p-0 pl-2 m-0">
                  Steps to cross the signal: {randomSteps} Steps
                </p>
                <p className="p-0 pl-2 m-0">
                  Time to cross the signal: {randomSeconds} seconds
                </p>
              </div>
            )}
          </div>
          {crossedSignal && (
            <h2 className="text-lg hidden md:inline md:text-2xl text-white text-bold">
              You've Crossed the Crosswalk Successfully.
            </h2>
          )}
          {crossedSignal && playSuccessSound()}
          <div className="flex md:mt-14 p-14 md:justify-end justify-end relative md:relative md:right[200px] md:bottom-[100px]">
            <div className="bg-blue-400 border-solid m-2 p-2 md:m-4 md:p-4 md:w-20 w-18 h-40 md:h-52 rounded-xl">
              <p
                style={{
                  backgroundColor:
                    activeLight === "red" ? "red" : "transparent",
                }}
                className="md:w-[50px] w-[40px] h-[40px] md:h-[50px] rounded-3xl "
              ></p>
              <p
                style={{
                  backgroundColor:
                    activeLight === "yellow" ? "yellow" : "transparent",
                }}
                className="md:w-[50px] w-[40px] h-[40px] md:h-[50px] rounded-3xl"
              ></p>
              <p
                style={{
                  backgroundColor:
                    activeLight === "green" ? "green" : "transparent",
                }}
                className="md:w-[50px] w-[40px] h-[40px] md:h-[50px] rounded-3xl"
              ></p>

              {/* <p className="w-2 h-80 bg-black relative right-[59px] top-[224px]"></p> */}
              <p className=" w-1 h-40 md:w-2 md:h-80  bg-black p-0 m-0 relative left-[20px] top-[30px] md:top-[42px]"></p>
            </div>
          </div>
          <div className="flex justify-center m-0 p-0">
            <img
              src={person}
              alt="Person Crossing Cross-Walk"
              // className="w-[200px] h-[300px] relative bottom-[150px]"
              className="md:w-[200px] w-[100px] h-[150px] md:h-[300px] relative bottom-[50px]"
            />
            <img
              src={crossWalk}
              alt="cross-walk"
              // className="w-1/2 relative bottom-[250px]"
              className="w-1/2 "
            />
          </div>

          <div>
            {/* Button to open the feedback dialog */}
            <button
              onClick={handleOpenDialog}
              className="md:p-4 p-2 m-2 text-sm md:text-lg md:m-4 rounded-lg bg-sky-400 text-white md:absolute md:bottom-[40px]"
            >
              Leave Feedback
            </button>

            {/* Feedback dialog component */}
            <FeedbackDialog
              open={dialogOpen}
              handleClose={handleCloseDialog}
              handleSubmit={handleSubmitFeedback}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Traffic;

