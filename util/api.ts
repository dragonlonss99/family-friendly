const FAMILY_API_URL = "https://stamp.family.com.tw/api/maps";
const FAMILY_API_PROJECT_CODE = "202106302";

export const getFriendlyContent = async (
  postCode: string = "",
  latitude: number = 0,
  longitude: number = 0
) => {
  const path = FAMILY_API_URL + "/MapProductInfo";
  const response = await fetch(path, {
    method: "POST",
    body: JSON.stringify({
      PostInfo: postCode,
      Latitude: latitude,
      Longitude: longitude,
      OldPKeys: [],
      ProjectCode: FAMILY_API_PROJECT_CODE,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result.data;
};

export const getClassification = async () => {
  const path = `${FAMILY_API_URL}/MapClassificationInfo?ProjectCode=${FAMILY_API_PROJECT_CODE}`;
  const response = await fetch(path, {
    method: "GET",
  });
  const result = await response.json();
  return result.data;
};
