import React, { CSSProperties, ReactNode } from "react";
import { Typography, TypographyProps } from "antd";
const { Title: AntTitle } = Typography;

interface TitleProps {
  children: ReactNode;
  style?: CSSProperties;
  level?: 1 | 2 | 3 | 4 | 5;
}

export default function Title({ children, level = 1, style }: TitleProps) {
  return (
    <AntTitle level={level} style={style}>
      {children}
    </AntTitle>
  );
}
