export const CustomizedLabel = ({
  x,
  y,
  value,
  stroke,
}: {
  x?: number;
  y?: number;
  value?: number;
  stroke?: string;
} = {}) => {
  if (value && value > 0) {
    return (
      <text x={x} y={y}>
        {value}
      </text>
    );
  }
};
