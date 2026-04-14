export const renderIndex = () => ({
  title: <div style={{ fontWeight: 600 }}>STT</div>,
  width: 60,
  align: "center",
  render: (_, __, index) => (
    <span style={{ fontWeight: 500, color: "#8c8c8c" }}>{index + 1}</span>
  ),
});

export const renderId = () => ({
  title: <div style={{ fontWeight: 600 }}>ID</div>,
  dataIndex: "id",
  width: 70,
  align: "center",
  render: (id) => (
    <span style={{ color: "#1677ff", fontWeight: 600, fontSize: 13 }}>
      #{id}
    </span>
  ),
});
