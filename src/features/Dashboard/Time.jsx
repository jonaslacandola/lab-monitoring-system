import { useEffect, useState } from "react";
import styled from "styled-components";

import { formatTime } from "../../data/formatTime";

const DateAndTime = styled.span`
  font-size: 14px;
  color: var(--slate-600);
`;

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(function () {
    const intervalTime = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(intervalTime);
  }, []);

  return <DateAndTime>{formatTime(currentTime.toTimeString())}</DateAndTime>;
}

export default Time;
