// src/components/ResultScreen.jsx
// このファイルは、結果発表のオーバーレイを表示するコンポーネントです。
// フレームモーションを使用して、結果発表のメッセージをアニメーション化しています。
// また、音声を再生する機能も含まれています。
import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionH1 = motion("h1"); // framer-motionを使用してh1要素をアニメーション化

// ResultScreenコンポーネントは、結果発表のオーバーレイを表示するためのコンポーネントです。
// showResultプロパティがtrueの場合にオーバーレイを表示し、
// 画面全体に半透明の背景を設定します。
// また、結果発表のメッセージをアニメーションで表示します。
// useEffectフックを使用して、showResultがtrueになったときに音声を再生します。
// 2つ目の音声は5秒後に再生されます。
// オーバーレイは、画面全体を覆い、クリックや
// 他の操作を無効にするためにpointerEventsをnoneに設定しています。
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
          initial={{ rotate: 0 }} // 初期状態では回転なし
          animate={{ rotate: [0, -5, 5, -5, 0] }} // アニメーションの設定
          transition={{ duration: 1.2, repeat: Infinity }} // アニメーションの持続時間と繰り返し設定
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
