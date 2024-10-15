document.addEventListener("DOMContentLoaded", function () {
  console.log("광고 클릭");
  const closeAdButton = document.querySelector(".close-ad");
  const adBanner = document.querySelector(".ad-banner");

  closeAdButton.addEventListener("click", function () {
    adBanner.style.display = "none"; // 배너 숨기기
  });
});
