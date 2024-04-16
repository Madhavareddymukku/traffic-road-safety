import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

const FeedbackDialog = ({ open, handleClose, handleSubmit }) => {
  const [feedbackFormData, setFeedbackFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    feedback: "",
  });

  // Function to handle changes in the feedback form fields
  const handleFeedbackFormChange = (e) => {
    const { name, value } = e.target;
    setFeedbackFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle submitting the feedback form
  const handleFormSubmit = () => {
    handleSubmit(feedbackFormData);
    // Reset form data after submission
    setFeedbackFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      feedback: "",
    });
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="max-w-md bg-green-200 "
    >
      <DialogHeader className="flex justify-center">Leave Feedback</DialogHeader>
      <DialogBody>
        <div className="space-y-4 text-black">
          <p className="font-bold">Full Name :</p>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={feedbackFormData.fullName}
            onChange={handleFeedbackFormChange}
            className="border-black"
          />
           <p className="font-bold">Email Address :</p>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={feedbackFormData.email}
            onChange={handleFeedbackFormChange}
            className="border-black"
          />
           <p className="font-bold">Mobile Number :</p>
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={feedbackFormData.phoneNumber}
            onChange={handleFeedbackFormChange}
            className="border-black"
          />
           <p className="font-bold">Feedback :</p>
          <Textarea
            name="feedback"
            placeholder="Your Feedback"
            value={feedbackFormData.feedback}
            onChange={handleFeedbackFormChange}
            className="border-black rounded-md w-full p-2"
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button onClick={handleFormSubmit} color="blue" className="p-4 m-2">
          Submit
        </Button>
        <Button onClick={handleClose} color="gray" variant="outline" className="p-4 m-2">
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FeedbackDialog;
