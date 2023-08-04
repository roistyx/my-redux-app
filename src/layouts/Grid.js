import "./Grid.css";

export const Grid = ({ bgColor, gap, gridBorder, childBorder, children }) => {
  console.log(bgColor, gap, "bgColor, gap");
  const style = {
    ...(bgColor ? { "--background-color": bgColor } : {}),
    ...(gap ? { "--gap": gap } : {}),
    ...(gridBorder ? { "--grid-border": gridBorder } : {}),
    ...(childBorder ? { "--child-border": childBorder } : {}),
  };
  return (
    <div className="Grid" style={style}>
      {children}
    </div>
  );
};
