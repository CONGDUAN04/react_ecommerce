import { Table } from "antd";

const BaseTable = ({
  columns,
  data,
  rowKey = "id",
  current,
  pageSize,
  total,
  updatePagination,
  showSizeChanger = true,
  showTotal = (total, range) =>
    `Hiển thị ${range[0]}-${range[1]} trên tổng ${total} bản ghi`,
}) => {
  const onChange = (pagination) => {
    updatePagination(pagination.current, pagination.pageSize);
  };

  return (
    <div
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        background: "#fff",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        pagination={{
          current: current || 1, // ✅ FIX
          pageSize: pageSize || 10, // ✅ FIX
          total,
          showSizeChanger,
          showTotal,
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default BaseTable;
