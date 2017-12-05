const overflow = browser.getObj(`overflow`);

exports.openTabInOverflow = function (elementName) {
  // open provided subcategory inside overflow tab
  let elementSelector;
  switch (elementName) {
    case 'Message':
      elementSelector = overflow.overflowMessage;
      break;
    case 'Call':
      elementSelector = overflow.overflowCall;
      break;
    case 'Payment':
      elementSelector = overflow.overflowPayment;
      break;
    case 'Recommendation':
      elementSelector = overflow.overflowRecommend;
      break;
    case 'Hired':
      elementSelector = overflow.overflowHired;
      break;
    case 'Completed':
      elementSelector = overflow.overflowComplered;
      break;
    case 'Archive':
      elementSelector = overflow.overflowArchive;
      break;
    case 'Accepted':
      elementSelector = overflow.overflowAccepted;
      break;
    case 'ConsumerFeedback':
      elementSelector = overflow.overflowConsumerFeedback;
      break;
    default:
      break;
  }
  browser.waitForExist(elementSelector, 15000);
  return elementSelector;
};
