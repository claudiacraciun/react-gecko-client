import { useEffect, useRef } from "react";

const useEffectOnce = (cb) => {
  const countCalls = useRef(0);
  useEffect(() => {
    if (countCalls.current === 0) cb();
    countCalls.current = 1;
  }, [cb]);
};

export { useEffectOnce };