import React from 'react';

const EventDescriptionTag = ({ text, index, hasRandomColor = true }) => {
  let randomNum = Math.floor(Math.random() * 6);
  let bg = ["#F4F3FF", "#EFF8FF", "#FDF2FA", "#FEF6EE", "#ECFDF3", "#FEF3F2"];
  let border = ["#D9D6FE", "#B2DDFF", "#FCCEEE", "#F9DBAF", "#ABEFC6", "#FECDCA"];
  let txt = ["#5925DC", "#175CD3", "#C11574", "#B93815", "#067647", "#B42318"];

  let age = text.split("+")[0];

  if (text === "PG") {
    randomNum = 4;
  } else if (age > 0 && age < 18) {
    randomNum = 1;
  } else if (age >= 18 && age < 21) {
    randomNum = 3;
  } else if (age >= 21) {
    randomNum = 5;
  }

  const containerStyles = {
    backgroundColor: hasRandomColor && bg[randomNum],
    borderColor: hasRandomColor &&  border[randomNum],
    width: 'fit-content',
    padding: "2px 8px",
    borderWidth: 2,
    borderRadius: 9999,
    marginRight: index === 0 ? 4 : 2,
    marginLeft: index === 0 ? 0 : 2,
  };
  const textStyles = {
    color: hasRandomColor && txt[randomNum],
    fontSize: 14,
    fontWeight: '500',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={containerStyles} className={index === 0 ? 'mr-1' : 'mx-1'}>
      <p style={textStyles} className="text-gray-500 font-medium">{text}</p>
    </div>
  );
};

export default EventDescriptionTag;
