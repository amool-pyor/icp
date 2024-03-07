import {
  Tabs as AntTab,
  TabsProps as AntTabProps,
  ConfigProvider,
  ThemeConfig,
} from "antd";

export interface TabBarProps {
  items: AntTabProps["items"];
  size?: AntTabProps["size"];
  style?: AntTabProps["style"];
  defaultActiveKey?: AntTabProps["defaultActiveKey"];
  type?: AntTabProps["type"];
  theme?: ThemeConfig;
  tabBarStyle?: AntTabProps["tabBarStyle"];
  activeKey?: AntTabProps["activeKey"];
  onEdit?: AntTabProps["onEdit"];
  hideAdd?: AntTabProps["hideAdd"];
  onChange?: AntTabProps["onChange"];
  centered?: AntTabProps["centered"];
}

const defaultSize = "small";
const defaultStyle = {
  color: "white",
  paddingTop: 0,
  fontSize: 10,
};
const theme = {
  token: {
    fontSize: 14,
  },
};

export default function TabBar({
  items,
  size,
  style,
  defaultActiveKey,
  type,
  theme,
  tabBarStyle,
  activeKey,
  onEdit,
  hideAdd,
  onChange,
  centered,
}: TabBarProps) {
  // console.log(activeKey,"line 49",defaultActiveKey);
  
  return (
    <ConfigProvider theme={theme}>
      <AntTab
        tabBarStyle={tabBarStyle}
        size={size ? size : defaultSize}
        style={style ? style : defaultStyle}
        defaultActiveKey={defaultActiveKey ? defaultActiveKey : "1"}
        items={items}
        type={type}
        activeKey={activeKey}
        onEdit={onEdit}
        hideAdd={hideAdd}
        onChange={onChange}
        centered={centered}
      />
    </ConfigProvider>
  );
}
