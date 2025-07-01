// src/utils/shuffle.js
// 配列をシャッフルするユーティリティ関数
// この関数は、与えられた配列をランダムに並び替えます。
export const shuffleArray = (array) => {
  const result = [...array]; // 元の配列をコピーして新しい配列を作成
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // ランダムなインデックスを生成
    // インデックスiとjの要素を入れ替え
    [result[i], result[j]] = [result[j], result[i]]; // ES6の分割代入を使用して要素を入れ替え
  }
  return result;
};
