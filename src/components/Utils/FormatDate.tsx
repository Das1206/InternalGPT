/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface FormatDateProps {
  date: Date;
}

const FormatDate: React.FC<FormatDateProps> = ({ date }) => {
  const selectedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    selectedDate
  );

  console.log(formattedDate);

  return <div>{formattedDate}</div>; // Example: rendering the formatted date in JSX
};

export default FormatDate;
