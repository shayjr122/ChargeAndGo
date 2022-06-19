const orderCreate = async (userId, price, startTime, endTime, res) => {};

const orderDelete = async (userId, stationId, orderId, res) => {};

const orderUpdate = async (
  userId,
  stationId,
  orderId,
  price,
  startTime,
  endTime,
  res
) => {};

module.exports = {
  orderCreate,
  orderDelete,
  orderUpdate,
};
