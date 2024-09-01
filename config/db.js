const MONGO_INFO = {
  mongoId: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
};

export const getMongoUrl = () =>
  `mongodb+srv://${MONGO_INFO.mongoId}:${MONGO_INFO.mongoPassword}@cluster0.4ocsomh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export default MONGO_INFO;
