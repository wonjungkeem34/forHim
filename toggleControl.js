document.addEventListener("DOMContentLoaded", function () {
  const recentMatchesContainer = document.getElementById("recent-matches");

  recentMatchesContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("toggle-details")) {
      const matchDiv = event.target.closest(".match-item"); // matchDiv를 .match-item으로 수정

      // matchDiv가 null이 아닌지 확인
      if (matchDiv) {
        const matchDetailsDiv = matchDiv.querySelector(".match-details"); // querySelector로 찾기

        if (matchDetailsDiv) {
          if (matchDetailsDiv.classList.contains("open")) {
            matchDetailsDiv.classList.remove("open");
            event.target.textContent = "open";
            matchDetailsDiv.style.display = "none";
          } else {
            matchDetailsDiv.classList.add("open");
            event.target.textContent = "close";
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
        // previousElementSibling의 오타 수정
        div.previousElementSibling.querySelector(
          ".toggle-details"
        ).textContent = "open";
        div.style.display = "none";
      });
    }
  });
});
