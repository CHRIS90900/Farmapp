import React from "react";

interface StatsItemProps {
  title: string;
  value: string;
  icon: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ title, value, icon }) => {
  return (
    <div className="stats-item">
      <i className={icon}></i>
      <div>
        <h4>{value}</h4>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatsItem;
