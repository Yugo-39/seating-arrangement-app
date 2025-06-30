import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionH1 = motion("h1");

const ResultScreen = ({ showResult }) => {
  useEffect(() => {
    if (showResult) {
      const audio = new Audio("/sound/result.mp3");
      audio.play();

      // 🔊 2つ目の音（少し遅らせて鳴らす）
      setTimeout(() => {
        const audio2 = new Audio("/sound/clap.mp3");
        audio2.play();
      }, 5000); // 5秒後に鳴らす
    }
  }, [showResult]); // showResult が true になったときに実行される

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.7)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pointerEvents: "none",
      }}
    >
      {showResult && (
        <MotionH1
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            padding: "10px 30px",
            borderRadius: "12px",
          }}
        >
          🎉 結果発表 🎉
        </MotionH1>
      )}
    </div>
  );
};

export default ResultScreen;
