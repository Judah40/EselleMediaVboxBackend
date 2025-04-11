const { cloudFront } = require("../../config/aws.config");

// Function to find CloudFront distribution by MediaPackage Origin Domain
async function getCloudFrontDistributionByMediaPackageDomain(
  mediaPackageDomainName
) {
  try {
    let nextMarker;
    let matchingDistribution = null;

    do {
      const params = nextMarker ? { Marker: nextMarker } : {};
      const response = await cloudFront.listDistributions(params).promise();

      if (response.DistributionList && response.DistributionList.Items) {
        for (const distribution of response.DistributionList.Items) {
          if (distribution.Origins && distribution.Origins.Items) {
            for (const origin of distribution.Origins.Items) {
              if (origin.DomainName === mediaPackageDomainName) {
                matchingDistribution = distribution;
                return matchingDistribution; // Found a match, return it
              }
            }
          }
        }
      }

      nextMarker = response.DistributionList.NextMarker;
    } while (nextMarker);

    return matchingDistribution; // Return null if no match is found
  } catch (error) {
    console.error("Error getting CloudFront distribution:", error);
    throw error;
  }
}

async function createCloudFrontDistribution(originDomainName, id) {
  // const existingDistribution =
  //   getCloudFrontDistributionByMediaPackageDomain(originDomainName);
  // if (existingDistribution) {
  //   return existingDistribution;
  // }
  const params = {
    DistributionConfig: {
      CallerReference: String(Date.now()), // Unique identifier for the request
      Origins: {
        Quantity: 1,
        Items: [
          {
            Id: "MediaPackageOrigin",
            DomainName: new URL(originDomainName).hostname, // MediaPackage endpoint domain name
            OriginPath: "", // Path to the MediaPackage endpoint
            CustomOriginConfig: {
              HTTPPort: 80,
              HTTPSPort: 443,
              OriginProtocolPolicy: "https-only", // Use HTTPS for communication with MediaPackage
              OriginSslProtocols: {
                Quantity: 3,
                Items: ["TLSv1.2", "TLSv1.1", "TLSv1"],
              },
            },
          },
        ],
      },
      DefaultCacheBehavior: {
        TargetOriginId: "MediaPackageOrigin",
        ViewerProtocolPolicy: "redirect-to-https",
        AllowedMethods: {
          Quantity: 7,
          Items: ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"],
        },
        ForwardedValues: {
          QueryString: true,
          Cookies: {
            Forward: "all",
          },
          Headers: {
            Quantity: 0, // Adjust as needed
            Items: [], // Adjust as needed
          },
          QueryStringCacheKeys: {
            Quantity: 0, // Adjust as needed
            Items: [], // Adjust as needed
          },
        },
        MinTTL: 0,
        DefaultTTL: 3600, // 1 hour
        MaxTTL: 86400, // 1 day
      },
      Enabled: true,
      Comment: `CloudFront distribution for MediaPackage channel ${id}`,
      PriceClass: "PriceClass_100", // Adjust as needed
      ViewerCertificate: {
        CloudFrontDefaultCertificate: true, //or specify a custom certificate
      },
    },
  };

  try {
    console.log("CloudFront Params:", JSON.stringify(params, null, 2));
    const response = await cloudFront.createDistribution(params).promise();
    console.log("CloudFront Distribution Created:", response);
    return response;
  } catch (error) {
    console.error("Error creating CloudFront distribution:", error);
    console.error("Detailed Error:", JSON.stringify(error, null, 2)); // Add this line for detailed error info
    throw error; // Rethrow the error to stop execution
  }
}

module.exports = createCloudFrontDistribution;
