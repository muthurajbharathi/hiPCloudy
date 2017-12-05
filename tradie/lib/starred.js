const starsLib = browser.getObj(`stars`);


exports.clickStar = function () {
	// click on the star inside accpted tab
  browser.click(starsLib.starBtn);
};
