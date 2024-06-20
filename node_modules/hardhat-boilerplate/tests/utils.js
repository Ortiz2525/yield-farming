function transformToAssociativeArray(array) {
  const result = [];
  array.forEach((item) => {
    const currentObj = [];
    Object.keys(item).forEach((key, index) => {
      currentObj[index] = item[key];
      currentObj[key] = item[key];
    });
    result.push(currentObj);
  });
  return result;
}

function attributesToString(attributes) {
  let attributesPropInString = '"attributes":[';
  const attrAmount = attributes.length;
  attributes.forEach((item, index) => {
    const appendComma = index !== attrAmount - 1;
    attributesPropInString += `${attributeToJSON(item)}${appendComma ? ',' : ''}`;
  });
  attributesPropInString += ']';
  return attributesPropInString;
}

function royaltyToString(royaltyData) {
  if (!royaltyData || royaltyData.feePercentage === '0') return '';
  return `,"seller_fee_basis_points":"${royaltyData.feePercentage}","fee_recipient":"${royaltyData.recipientAddress
    .toString()
    .toLowerCase()}"`;
}

function metadataToString(metadata) {
  const imageString = metadata.image ? `"image":"${metadata.image}",` : '';
  return `{"description":"${metadata.description}",${imageString}"name":"${metadata.name}",${attributesToString(
    metadata.attributes,
  )}${royaltyToString(metadata.royalty)}}`;
}

function attributeToJSON(attribute) {
  let result = '{';
  if (attribute.displayType) {
    result = `${result}"display_type":"${attribute.displayType}",`;
  }
  if (attribute.traitType) {
    result = `${result}"trait_type":"${attribute.traitType}","value":"${attribute.value}"`;
  }
  return `${result}}`;
}

function base64URIToJSONString(uri) {
  const base64Data = uri.split(',')[1];
  return Buffer.from(base64Data, 'base64').toString();
}

module.exports = {
  transformToAssociativeArray,
  attributesToString,
  royaltyToString,
  metadataToString,
  attributeToJSON,
  base64URIToJSONString,
};
