import "./Line.css";

export const Line = ({ children, addClass, backgroundColor, height, gap }) => {
  console.log(backgroundColor, height, gap);
  return (
    <div
      style={{
        ...(backgroundColor ? { "--background-color": backgroundColor } : {}),
        ...(height ? { "--height": height } : {}),
        ...(gap ? { "--gap": gap } : {}),
      }}
      className={`Line ${addClass || ""}`}>
      {children}
    </div>
  );
};

export const FlexEnd = (props) => {
  return <Line {...props} addClass="flex-end" />;
};

export const FlexStart = (props) => {
  return <Line {...props} addClass="flex-start" />;
};

export const Between = (props) => {
  console.log(props);
  return <Line {...props} addClass="between" />;
};

export const Center = (props) => {
  return <Line {...props} addClass="center" />;
};

export const SpaceEvenly = (props) => {
  return <Line {...props} addClass="evenly" />;
};

export const Rows = (props) => {
  return <Line {...props} addClass="rows" />;
};

export const AlignStart = ({ children }) => {
  return <div className="AlignStart">{children}</div>;
};

export const AlignCenter = ({ children }) => {
  return <div className="AlignCenter">{children}</div>;
};
