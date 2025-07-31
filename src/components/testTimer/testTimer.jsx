import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const TestTimer = ({ duration, onTimeEnd, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60)

 useEffect(() => {
  if (isPaused) return
  if (timeLeft <= 0) {
    onTimeEnd()
    return
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1)
  }, 1000)

  return () => clearInterval(timer)
}, [timeLeft, isPaused, onTimeEnd])



  const formatTime = () => {
    const min = Math.floor(timeLeft / 60)
    const sec = timeLeft % 60
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  };

  return (
    <Typography variant="h6" sx={{ color: "#b90504" }}>
      Time Left: {formatTime()}
    </Typography>
  );
};

export default TestTimer
