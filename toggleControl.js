document.addEventListener("DOMContentLoaded", function () {
  const recentMatchesContainer = document.getElementById("recent-matches");
  const openTriangleUrl = url("./data/img/down.png");
  const closeTriangleUrl = url("./data/img/up.png");

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
      event.stopPropagation(); // 클릭 이벤트 전파 방지
    }
  });
});
document.addEventListener("click", function (event) {
  // 클릭된 요소가 .toggle-details 또는 .match-details가 아닌 경우
  if (
    !event.target.closest(".toggle-details") &&
    !event.target.closest(".match-details")
  ) {
    // 열린 match-details를 찾음
    const openDetailsDivs = document.querySelectorAll(".match-details.open");

    openDetailsDivs.forEach((matchDetailsDiv) => {
      matchDetailsDiv.classList.remove("open");
      matchDetailsDiv.style.display = "none"; // 숨김 처리

      // toggleButton을 찾고 이미지 변경
      const toggleButton =
        matchDetailsDiv.previousElementSibling.querySelector(".toggle-details");
      if (toggleButton) {
        // 버튼의 배경 이미지를 열기 이미지로 변경
        toggleButton.style.backgroundImage = url("./data/img/down.png"); // 여기서 경로를 직접 사용
        toggleButton.style.display = "block";
      }
    });
  }
});
