# My Ear 共用 HTML 排版規則

版本：1.0.0（2026-11-22）

## 用途與來源
本規格供 My Ear 的 IoT（p0006）與 TOI（p0007）共用。依 p0006 已明定的淡綠／白色、簡潔 Blogger 風格，以及使用者要求的跨類型一致性設計。**這不是從已發佈的 IoT HTML 精確擷取的 CSS**；若要像素級一致，須再比對實際 HTML。

## 唯一樣式來源
- `templates/my-ear.css` 為共用樣式的唯一維護來源。
- 產生文章前，必須實際讀取此檔案；不能只憑「My Ear 風格」字樣推測。
- Blogger Publisher 若無法載入外部 CSS，應將這份 CSS 原文置入文章的 `<style>`，不可另行創作相似 CSS。
- 所有文章使用 `<article class="myear">` 作為根節點，所有排版樣式限制在 `.myear` 之內。
- 標題、字體、字級、配色、留白、表格、卡片、問答及導覽皆共用；文章內容、章節、心智圖與 TOI 追蹤表可以不同。

## HTML 結構契約
- 頂部：`<h1>`、`<div class="me-meta">`、`<div class="me-summary">`，不使用大型 Hero。
- 兩欄時：`<div class="me-grid"><main class="me-main">…</main><nav class="me-toc">…</nav></div>`。
- TOI 可使用右側 sticky 目錄；手機或窄版面自動移到內容上方。
- IoT 若使用一般文章內目錄，也沿用 `me-toc` 樣式，不必強制右側。
- 表格外層使用 `<div class="me-table-scroll">…</div>`。
- 複習題使用 `<details><summary>問題</summary>答案</details>`。
- 重點說明使用 `me-note`；資訊卡使用 `me-card`。
- 所有目錄錨點須對應唯一 ID；章節編號直接寫入可見文字。
- 心智圖的 SVG/JavaScript 由 p0006 管理，但其外框、字體與色彩需遵守共用變數；不得覆蓋 Blogger 全域 CSS。

## 資安與內容
此檔案及 CSS 只能包含樣式、空白結構或虛構範例，不得放入真實逐字稿、內部網址、帳號、員工姓名、薪酬或公司架構。

## 驗收
1. p0006 與 p0007 均讀取相同 CSS 檔案，不得各自重寫一套顏色與字級。
2. 960px 以內自適應 Blogger 容器；窄版不出現橫向整頁捲動。
3. TOI 右側目錄在寬版不遮住文章；窄版改為內文上方。
4. 表格可水平捲動；圖片、SVG 不溢出。
5. 保留各 Prompt 的來源忠實度與知識架構規則。
6. 如未在實際 Blogger 主題測試，不宣稱已完成發布相容性驗證。
