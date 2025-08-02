import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const TestTimer = ({ duration, onTimeEnd, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60 * 60);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeEnd,timeLeft]); 

  const formatTime = () => {
    const hrs = Math.floor(timeLeft / 3600);
    const min = Math.floor((timeLeft % 3600) / 60);
    const sec = timeLeft % 60;
    return `${hrs.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Typography variant="h6" sx={{ color: "#b90504" }}>
      Duration: {formatTime()}
    </Typography>
  );
};

export default TestTimer;
