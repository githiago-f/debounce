import { useEffect, useRef, useState } from "react";

const debounce = (cb) => {
  let timer;
  return (...e) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...e), 500);
  };
};

const throttle = (cb, delay = 1000) => {
  let shouldWait = false, lastProps;
  const fn = () => {
    if (lastProps == null) {
      shouldWait = false;
      return;
    }
    cb(...lastProps);
    lastProps = null;
    setTimeout(fn, delay);
  };

  return (...args) => {
    if (shouldWait) {
      lastProps = args;
      return;
    }
    cb(...args);
    shouldWait = true;

    setTimeout(fn, delay);
  };
}

export default function App() {
  const [def, setDefCounter] = useState(0);
  const [deb, setDebCounter] = useState(0);
  const [thr, setThrCounter] = useState(0);

  const debouced = useRef(debounce(() => setDebCounter(c => c + 1)));

  const listener = throttle(() => setThrCounter(c => c + 1));

  useEffect(() => {
    window.addEventListener('mousemove', listener);
  }, []);

  return (
    <div>
      <input
        type="text"
        name="text"
        id="text"
        onInput={() => {
          setDefCounter(def + 1);
          debouced.current();
        }}
      />
      <h2>Default: {def}</h2>
      <h2>Debounce: {deb}</h2>
      <hr />
      <h2>Throttle: {thr}</h2>
    </div>
  );
}