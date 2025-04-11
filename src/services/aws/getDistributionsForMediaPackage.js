const { cloudFront } = require("../../config/aws.config");

function extractTextFromUrl(url) {
  const regex = /^https:\/\/([^\/]+)\.com/;
  const match = url.match(regex);

  if (match) {
    return match[1]; // This gives you the text between 'https://' and '.com'
  } else {
    return null; // Return null if no match is found
  }
}
const getDistributionsForMediaPackage = async (endpointDomain) => {
  const matchedDistributions = [];

  const url = extractTextFromUrl(endpointDomain);

  let marker;
  do {
    const result = await cloudFront
      .listDistributions({ Marker: marker })
      .promise();

    const items = result.DistributionList.Items || [];
    for (const dist of items) {
      const origins = dist.Origins.Items || [];
      for (const origin of origins) {
        if (origin.DomainName.includes(url)) {
          matchedDistributions.push({
            DistributionId: dist.Id,
            DomainName: dist.DomainName,
            OriginDomainName: origin.DomainName,
            Comment: dist.Comment,
          });
        }
      }
    }

    marker = result.DistributionList.IsTruncated
      ? result.DistributionList.NextMarker
      : null;
  } while (marker);

  return matchedDistributions;
};

module.exports = {
  getDistributionsForMediaPackage,
};
