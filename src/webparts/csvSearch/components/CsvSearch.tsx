import * as React from "react";

export interface ICsvSearchProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

interface CsvItem {
  番号: string;
  タイトル: string;
  詳細: string;
  URL: string;
}

export const CsvSearch: React.FC<ICsvSearchProps> = () => {
  const [csvData, setCsvData] = React.useState<CsvItem[]>([]);
  const [keyword, setKeyword] = React.useState("");
  const [filtered, setFiltered] = React.useState<CsvItem[]>([]);

  React.useEffect(() => {
    const fetchCsv = async () => {
      try {
        const response = await fetch(
          "https://cagla.sharepoint.com/sites/cagla/_layouts/15/download.aspx?UniqueId=5b55da99%2D41b1%2D4c2b%2Db08f%2D757e74464f9f"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const rows = text.trim().split("\n").slice(1); // skip header
        const items = rows.map((row) => {
          const [番号, タイトル, 詳細, URL] = row.split(",");
          return { 番号, タイトル, 詳細, URL };
        });

        setCsvData(items);
      } catch (error) {
        console.error("Failed to fetch CSV:", error);
        alert("CSVの読み込みに失敗しました。もう一度お試しください。");
      }
    };

    fetchCsv();
  }, []);

  const handleSearch = () => {
    const kw = keyword.toLowerCase();
    const result = csvData.filter(
      (item) =>
        item.タイトル?.toLowerCase().includes(kw) ||
        item.詳細?.toLowerCase().includes(kw) ||
        item.URL?.toLowerCase().includes(kw)
    );
    setFiltered(result);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索語を入力"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>
      <ul>
        {filtered.map((item, idx) => (
          <li key={idx}>
            <strong>{item.タイトル}</strong>
            <br />
            {item.詳細}
            <br />
            <a href={item.URL} target="_blank" rel="noreferrer">
              {item.URL}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
