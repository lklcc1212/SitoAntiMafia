// Copyright (c) 2025 lklcc1212
// Licensed under the MIT License.

/* ---------- 默认值 ---------- */
const defaultHash = "#intro";
const it_Title = "Eroica legalità";
const zh_CN_Title = "Eroica legalità";
const footer = `<footer class="credits zh-CN">
            © 2025 lklcc1212
            <br />
            本网页仅用于教育目的。 
            <br />
            本网页部分信息来源于维基百科词条
            <a
              href="https://it.wikipedia.org/wiki/Giovanni_Falcone"
              target="_blank"
              >《Giovanni Falcone》</a
            >、<a
              href="https://it.wikipedia.org/wiki/Paolo_Borsellino"
              target="_blank"
              >《Paolo Borsellino》</a
            >、<a
              href="https://it.wikipedia.org/wiki/Peppino_Impastato"
              target="_blank"
              >《Peppino Impastato》</a
            >、<a
              href="https://it.wikipedia.org/wiki/Pino_Puglisi"
              target="_blank"
              >《Don Pino Puglisi》</a
            >内容已编辑与翻译，根据<a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
            >
              CC BY-SA 4.0</a
            >
            许可发布。
            <br />
            本网页中的原创文本内容采用<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>许可发布。
            <br />
            更多许可信息：
            <a href="LICENSE.txt" target="_blank">点击这里。</a>
          </footer>
          <footer class="credits it">
            © 2025 lklcc1212
            <br />
            Questa pagina web è solo a scopo didattico.
            <br />
            Alcuni informazioni di questa pagina web sono tratte dalle voci di
            Wikipedia
            <a
              href="https://it.wikipedia.org/wiki/Giovanni_Falcone"
              target="_blank"
              >“Giovanni Falcone”</a
            >,
            <a
              href="https://it.wikipedia.org/wiki/Paolo_Borsellino"
              target="_blank"
              >“Paolo Borsellino”</a
            >,
            <a
              href="https://it.wikipedia.org/wiki/Peppino_Impastato"
              target="_blank"
              >“Peppino Impastato”</a
            >,
            <a href="https://it.wikipedia.org/wiki/Pino_Puglisi" target="_blank"
              >“Don Pino Puglisi”</a
            >. I contenuti sono modificati, rilasciati sotto la licenza
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              >CC BY-SA 4.0</a
            >.
            <br />
            Tutti i contenuti testuali originali di questa pagina web sono rilasciati sotto la licenza <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
            <br />
            Ulteriori informazioni sulle licenze:
            <a href="LICENSE.txt" target="_blank">Clicca qui.</a>
          </footer>`;

/* ---------- 静态类：风格管理器 ---------- */
let currentStyle = undefined;
let addedFooter = false; // 只用于style2和easyStyles

class stylesPathsManager {
  static #stylesPathMap = {
    easyStyles: "styles/easyStyles.css",
    style1: "styles/styles1.css",
    style2: "styles/styles2.css",
  };
  /**
   * @param {string} style
   * @returns {string}
   */
  static getStylePath(style) {
    const isStyle1 = style === "style1";

    if (window.location.hash === "" || !isStyle1)
      if (style === "style1") {
        window.location.hash = localStorage.getItem("savedHash") || defaultHash;
        //滑到顶部
        document
          .getElementById(window.location.hash.replace("#", ""))
          ?.parentElement.scrollTo(0, 0);

        addedFooter = false;
      } else {
        //为style2和easyStyles增加footer。如果有则不增加。
        if (!addedFooter) {
          const allFooter = document.querySelectorAll("footer");

          for (let footer of allFooter) {
            footer.remove();
          }

          const sections = document.querySelectorAll("section");
          sections[sections.length - 2].insertAdjacentHTML("beforeend", footer);
        }

        window.location.hash = "";
        addedFooter = true;
      }

    return this.#stylesPathMap[style];
  }
}

/* ---------- 应用已保存的数据(语言，主题和风格) ---------- */
function applySavedDatas() {
  // 风格应用
  const savedStyle = localStorage.getItem("savedStyle") || "style1";
  document.getElementById("style").href =
    stylesPathsManager.getStylePath(savedStyle);
  currentStyle = savedStyle;

  // 主题应用
  const savedTheme = localStorage.getItem("theme");
  const themeBtn = document.getElementById("theme-toggle");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "🌙";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "☀️";
  }

  // 语言应用
  const savedLang = localStorage.getItem("lang") || "it";
  const langBtn = document.getElementById("lang-toggle");
  document.documentElement.lang = savedLang;
  const isChinese = savedLang === "zh-CN";
  langBtn.setAttribute(
    "src",
    isChinese ? "icons/china.png" : "icons/italy.png"
  );
  document.title = isChinese ? zh_CN_Title : it_Title;
}

applySavedDatas();

/* ---------- 暗/亮主题切换 ---------- */
const themeBtn = document.getElementById("theme-toggle");
themeBtn?.addEventListener("click", toggleTheme);

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  themeBtn.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* ---------- 显示侧边面板的按钮 ---------- */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
  document.getElementById("translucentScreen").classList.toggle("show");
}

document
  .getElementById("translucentScreen")
  .addEventListener("click", toggleSidebar);

document
  .getElementById("showSidebarBtn")
  .addEventListener("click", toggleSidebar);

/* ---------- 侧边栏链接点击事件 ---------- */
function updateActiveLinkByHash() {
  if (currentStyle != "style1") {
    window.location.hash = "";
    return;
  }

  //如果 hash === ""，则...。（window.location.hash === "" ? defaultHash : window.location.hash）
  let currentHash = window.location.hash || defaultHash;
  if (window.location.hash === "") {
    window.location.hash = currentHash;
  }

  localStorage.setItem("savedHash", currentHash);

  let found = false;
  const links = document.querySelectorAll("#sidebar a");
  for (let link of links) {
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("active");
      found = true;

      //增加Footer
      const currentElement = document.getElementById(
        window.location.hash.replace("#", "")
      );
      if (!currentElement.querySelector("footer"))
        document
          .getElementById(window.location.hash.replace("#", ""))
          .insertAdjacentHTML("beforeend", footer);
    } else {
      link.classList.remove("active");
    }
  }

  if (!found) {
    window.location.hash = "#page-not-found";
  }
}

updateActiveLinkByHash();
window.addEventListener("hashchange", updateActiveLinkByHash);

/* ---------- 语言切换 ---------- */
const langBtn = document.getElementById("lang-toggle");
langBtn.addEventListener("click", changeLanguage);
function changeLanguage() {
  const isChinese = document.documentElement.lang === "zh-CN";
  const newLang = isChinese ? "it" : "zh-CN";
  document.documentElement.lang = newLang;

  localStorage.setItem("lang", newLang);

  langBtn.setAttribute(
    "src",
    newLang === "zh-CN" ? "icons/china.png" : "icons/italy.png"
  );

  document.title = isChinese ? it_Title : zh_CN_Title;
}

/* ---------- 监听语言变化 ---------- */
const checkLang = () => {
  const lang = document.documentElement.lang;
  if (lang !== "zh-CN" && lang !== "it") {
    document.documentElement.lang = localStorage.getItem("lang");
  }
};

const langObserver = new MutationObserver(checkLang);
langObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"],
});

checkLang();

/* ---------- 视频懒加载 ---------- */
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const video = /** @type {HTMLVideoElement} */ (e.target);
      video.src = video.dataset.src;
      video.load();
      videoObserver.unobserve(video);
    }
  });
});

document.querySelectorAll("video").forEach((v) => videoObserver.observe(v));

/* ---------- 清理器：页面卸载时断开所有监听 & 观察器 ---------- */
function disconnectObserver() {
  langObserver.disconnect();
  videoObserver.disconnect();
  window.removeEventListener("beforeunload", disconnectObserver);
}

window.addEventListener("beforeunload", disconnectObserver);

/* ---------- 切换样式按钮 ---------- */
const changeStylesBtn = document.getElementById("change-style-img");
changeStylesBtn.addEventListener("click", changeStyle);

function changeStyle() {
  if (!currentStyle) {
    currentStyle = localStorage.getItem("savedStyle") || "easyStyles";
  }
  console.log(currentStyle);

  const styles = ["easyStyles", "style1", "style2"];
  const currentIndex = styles.indexOf(currentStyle);
  const nextStyle = styles[(currentIndex + 1) % styles.length];

  const styleLink = /** @type {HTMLLinkElement} */ (
    document.getElementById("style")
  );
  styleLink.href = stylesPathsManager.getStylePath(nextStyle);
  currentStyle = nextStyle;
  localStorage.setItem("savedStyle", nextStyle);
}

/* ---------- 禁止右键图片 ---------- */
document.addEventListener("contextmenu", function (e) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (target instanceof HTMLImageElement) {
    e.preventDefault(); // 禁止图片元素的右键菜单
  }
});
