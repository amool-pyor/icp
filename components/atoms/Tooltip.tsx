import * as React from "react";
import { Popover } from "antd";

const Tooltip = ({
  children,
  renderContent = () => <></>,
  position = "top",
  behavior = "hover",
  title = null,
}: {
  children: React.ReactNode;
  renderContent?: () => React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  behavior?: "hover" | "click";
  title?: string | null;
}) => {
  return (
    <Popover
      overlayInnerStyle={{
        backgroundColor: "black",
        fontSize: 12,
      }}
      title={title ? <span style={{ color: "white" }}>{title}</span> : null}
      content={renderContent()}
      trigger={behavior}
      placement={position}
      autoAdjustOverflow={true}
      color="black"
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
