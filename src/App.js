import { Layout, Form, Input, Button, message } from "antd";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import "./App.css";
import html2canvas from 'html2canvas';
const { Content } = Layout;

function App() {
  const [name, setName] = useState("");
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);

  useEffect(() => {
    if (showCongratulations && name !== "") {
      setCompletionTime(Date.now());
    }
  }, [showCongratulations, name]);

  const captureScreenshot = async () => {
    const element = document.querySelector(".App");
    await new Promise(resolve => setTimeout(resolve, 100));
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = imgData;
    link.click();
  };
  
  const handleSubmit = ({ name, answer }) => {
    const normalizedAnswer = answer.trim().toLowerCase();
    if (
      normalizedAnswer ===
      "mục tiêu của bạn khi tham gia gđpt đông thiện là gì?"
    ) {
      setName(name);
      setShowCongratulations(true);
    } else {
      message.error("Đáp án không chính xác. Hãy thử lại!");
    }
  };

  return (
    <Layout className="layout">
      <Content className="content">
        <div className="App">
          {showCongratulations ? (
            <div className="congrats">
              <h2>Chúc mừng {name} đã trả lời đúng!</h2>
              <p>Đáp án là: Mục tiêu của bạn khi tham gia GĐPT Đông Thiện là gì?</p>
              <p>Thời gian hoàn thành: {completionTime && format(new Date(completionTime), "HH:mm:ss dd/MM/yyyy")}</p>
              <Button onClick={ captureScreenshot}>Chụp màn hình</Button>
            </div>
          ) : (
            <Form onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label="Tên của bạn là gì?"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Hãy gửi đáp án của bạn."
                name="answer"
                rules={[
                  { required: true, message: "Vui lòng nhập đáp án của bạn!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <div className="center">
                  <Button type="primary" htmlType="submit">
                    Gửi
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default App;