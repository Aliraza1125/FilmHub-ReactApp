import React,{useState} from "react";
import "./style.scss";
const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedtab, setselectedtab] = useState(0);
  const [left, setleft] = useState(0);

  const activetab = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setselectedtab(index);
    }, 300);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedtab===index ? "active " : ""}`}
            onClick={() => activetab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
