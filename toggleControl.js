document.addEventListener("DOMContentLoaded", function () {
  const recentMatchesContainer = document.getElementById("recent-matches");

  recentMatchesContainer.addEventListener("click", function (event) {
    // 클릭된 요소가 toggle-details인 경우
    if (event.target.classList.contains("toggle-details")) {
      const toggleButton = event.target; // 클릭된 toggle button
      const matchDiv = toggleButton.closest(".match-item"); // 클릭된 버튼의 상위 match-item 찾기

      if (matchDiv) {
        const matchDetailsDiv = matchDiv.querySelector(".match-details");

        if (matchDetailsDiv) {
          // match-details가 열려 있는지 확인
          if (matchDetailsDiv.classList.contains("open")) {
            matchDetailsDiv.classList.remove("open");
            toggleButton.classList.add("closed"); // 닫기 상태로 설정
            matchDetailsDiv.style.display = "none";
          } else {
            // 모든 toggle-details에 closed 클래스 추가
            const toggleButtons =
              recentMatchesContainer.querySelectorAll(".toggle-details");
            toggleButtons.forEach((button) => {
              button.classList.add("closed");
              button.classList.remove("open"); // 모든 버튼을 닫기 상태로 변경
              button.style.display = "block"; // 버튼의 상태를 유지
            });

            // 현재 match-details 열기
            matchDetailsDiv.classList.add("open");
            toggleButton.classList.remove("closed"); // 열기 상태로 설정
            toggleButton.classList.add("open"); // open 클래스 추가
            matchDetailsDiv.style.display = "block"; // match-details 표시
          }
        }
        event.stopPropagation(); // 클릭 이벤트 전파 방지
      }
    }
  });
});
