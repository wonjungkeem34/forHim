document.addEventListener("DOMContentLoaded", function () {
  const closeAdButton = document.querySelector(".close-ad");
  const adBanner = document.querySelector(".ad-banner");

  closeAdButton.addEventListener("click", function () {
    adBanner.style.display = "none"; // 배너 숨기기
  });
});
