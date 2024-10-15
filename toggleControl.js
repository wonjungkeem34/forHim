document.addEventListener("DOMContentLoaded", function () {
  const recentMatchesContainer = document.getElementById("recent-matches");

  recentMatchesContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("toggle-details")) {
      const matchDetailsDiv = event.target.closest("div").nextElementSibling;

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
  });
  document.addEventListener("click", function (event) {
    //외부 클릭했을 때
    if (
      !event.target.closest(".toggle-details") &&
      !event.target.closest(".match-details")
    ) {
      const openDetailsDivs = document.querySelectorAll(".match-details.open");

      openDetailsDivs.forEach((div) => {
        div.classList.remove("open");
        div.previousElementSibling.querySelector(
          ".toggle-details"
        ).textContent = "open";
        div.style.display = "none";
      });
    }
  });
});
