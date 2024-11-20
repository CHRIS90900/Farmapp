import { useState, useEffect } from "react";

function Home() {
  const [balance, setBalance] = useState<number>(0);
  const [lastClick, setLastClick] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.expand();
      tg.MainButton.text = "Start";
      tg.MainButton.show();
      tg.MainButton.onClick(() => handleStart());
    }

    const savedBalance = localStorage.getItem("balance");
    const savedLastClick = localStorage.getItem("lastClick");
    if (savedBalance) setBalance(Number(savedBalance));
    if (savedLastClick) setLastClick(Number(savedLastClick));

    return () => {
      tg?.MainButton.offClick(handleStart);
    };
  }, []);

  useEffect(() => {
    if (lastClick !== null) {
      const timeElapsed = Date.now() - lastClick;
      setIsButtonDisabled(timeElapsed < 600000); // Disable if less than 10 minutes
    }
  }, [lastClick]);

  const handleStart = () => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.text = "Close";
    tg.MainButton.onClick(() => tg.close());
    setIsButtonDisabled(false);
  };

  const handleClick = () => {
    const newBalance = balance + 50;
    setBalance(newBalance);
    const currentTime = Date.now();
    setLastClick(currentTime);

    localStorage.setItem("balance", newBalance.toString());
    localStorage.setItem("lastClick", currentTime.toString());
  };

  return (
    <div className="home-container">
      <h3>Welcome To This</h3>
      <h1> Balance Mini App</h1>
      <div>
        <button onClick={handleClick} disabled={isButtonDisabled}>
          Add
        </button>
        <p>You can only add 50 to your balance every 10 minutes.</p>
      </div>
      <div className="balance-display">
        <h2>Balance: {balance}</h2>
      </div>
    </div>
  );
}

export default Home;
