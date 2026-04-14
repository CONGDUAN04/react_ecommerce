import { Table } from "antd";

const BaseTable = ({
  columns,
  data,
  rowKey = "id",
  current,
  pageSize,
  total,
  setCurrent,
  setPageSize,
  showSizeChanger = true,
  showTotal,
  scroll = { x: 1200 },
}) => {
  return (
    <div
      style={{
        margin: 0,
        border: "1px solid #f0f0f0",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger,
          showTotal,
          onChange: (page, size) => {
            setCurrent?.(page);
            setPageSize?.(size);
          },
        }}
        scroll={scroll}
      />
    </div>
  );
};

export default BaseTable;
