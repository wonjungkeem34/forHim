document.addEventListener("DOMContentLoaded", function () {
  const recentMatchesContainer = document.getElementById("recent-matches");
  const openTriangleUrl = "./data/img/down.png"; // 열기 삼각형 이미지 URL
  const closeTriangleUrl = "./data/img/up.png"; // 닫기 삼각형 이미지 URL

  recentMatchesContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("toggle-details")) {
      const matchDiv = event.target.closest(".match-item"); // matchDiv를 .match-item으로 수정

      // matchDiv가 null이 아닌지 확인
      if (matchDiv) {
        const matchDetailsDiv = matchDiv.querySelector(".match-details"); // querySelector로 찾기

        if (matchDetailsDiv) {
          if (matchDetailsDiv.classList.contains("open")) {
            matchDetailsDiv.classList.remove("open");
            // 버튼의 배경 이미지를 열기 이미지로 변경
            event.target.style.backgroundImage = `url(${openTriangleUrl})`;
            matchDetailsDiv.style.display = "none";
          } else {
            matchDetailsDiv.classList.add("open");
            // 버튼의 배경 이미지를 닫기 이미지로 변경
            event.target.style.backgroundImage = `url(${closeTriangleUrl})`;
            matchDetailsDiv.style.display = "block";
          }
        }
      }
    }
  });

  document.addEventListener("click", function (event) {
    // 외부 클릭했을 때
    if (
      !event.target.closest(".toggle-details") &&
      !event.target.closest(".match-details")
    ) {
      const openDetailsDivs = document.querySelectorAll(".match-details.open");

      openDetailsDivs.forEach((div) => {
        div.classList.remove("open");
        div.previousElementSibling.querySelector(
          ".toggle-details"
        ).style.backgroundImage = `url(${openTriangleUrl})`; // 열기 이미지로 변경
      });
    }
  });
});
