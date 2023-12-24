import { AppDataSource } from "../db";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { TimeFrame } from "../models/TimeFrame";
import { TechnicalResource } from "../models/TechnicalResource";
import bcrypt from "bcrypt";


const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const roleSeedData = [
  { id: 1, role: "user" },
  { id: 2, role: "super_admin" },
];

const timeFrameSeedData = [
  { time_frame: "1m" },
  { time_frame: "5m" },
  { time_frame: "15m" },
  { time_frame: "30m" },
  { time_frame: "1h" },
  { time_frame: "2h" },
  { time_frame: "4h" },
  { time_frame: "6h" },
  { time_frame: "8h" },
  { time_frame: "12h" },
  { time_frame: "1d" },
  { time_frame: "3d" },
  { time_frame: "1w" },
  { time_frame: "1M" },
];

const technicalResourcesSeedData = [
  { name: "RSI", description: "Relative Strength Index" },
  { name: "MACD", description: "Moving Average Convergence Divergence" },
  { name: "BB", description: "Bollinger Bands" },
  { name: "SMA", description: "Simple Moving Average" },
  { name: "EMA", description: "Exponential Moving Average" },
  { name: "VWAP", description: "Volume Weighted Average Price" },
];

const userSeedData = [
  {
    name: "JohnDoe",
    nickname: "JohnD",
    email: "johndoe@example.com",
    password: "JohnDoe123$",
  },
  {
    name: "AliceSmith",
    nickname: "AliceS",
    email: "alicesmith@example.com",
    password: "AliceSmith123$",
  },
  {
    name: "BobJohnson",
    nickname: "BobJ",
    email: "bobjohnson@example.com",
    password: "BobJohnson123$",
  },
  {
    name: "EvaWilliams",
    nickname: "EvaW",
    email: "evawilliams@example.com",
    password: "EvaWilliams123$",
  },
  {
    name: "CharlieBrown",
    nickname: "CharlieB",
    email: "charliebrown@example.com",
    password: "CharlieBrown123$",
  },
  {
    name: "OliviaMiller",
    nickname: "OliviaM",
    email: "oliviamiller@example.com",
    password: "OliviaMiller123$",
  },
  {
    name: "DanielWilson",
    nickname: "DanielW",
    email: "danielwilson@example.com",
    password: "DanielWilson123$",
  },
  {
    name: "SophiaMoore",
    nickname: "SophiaM",
    email: "sophiamoore@example.com",
    password: "SophiaMoore123$",
  },
  {
    name: "LiamDavis",
    nickname: "LiamD",
    email: "liamdavis@example.com",
    password: "LiamDavis123$",
  },
  {
    name: "EmmaTaylor",
    nickname: "EmmaT",
    email: "emmataylor@example.com",
    password: "EmmaTaylor123$",
  },
  {
    name: "borja",
    nickname: "BGM",
    email: "borja@example.com",
    password: "Borja123$",
    role_id: 2,
  },
];

const hashPasswords = async () => {
  for (let i = 0; i < userSeedData.length; i++) {
    const user = userSeedData[i];
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
};

const strategySeedData = [
  {
    parameter_1: generateRandomNumber(1, 100),
    parameter_2: generateRandomNumber(1, 100),
    time_frame_id: generateRandomNumber(1, 14),
    name: "Strategy 1",
    description: "Strategy 1 description",
    user_id: generateRandomNumber(1, 11)
    },
  {
    parameter_1: generateRandomNumber(1, 100),
    parameter_2: generateRandomNumber(1, 100),
    time_frame_id: generateRandomNumber(1, 14),
    name: "Strategy 2",
    description: "Strategy 2 description",
    user_id: generateRandomNumber(1, 11)
    },
  {
    parameter_1: generateRandomNumber(1, 100),
    parameter_2: generateRandomNumber(1, 100),
    time_frame_id: generateRandomNumber(1, 14),
    name: "Strategy 3",
    description: "Strategy 3 description",
    user_id: generateRandomNumber(1, 11)
    },
  {
    parameter_1: generateRandomNumber(1, 100),
    parameter_2: generateRandomNumber(1, 100),
    time_frame_id: generateRandomNumber(1, 14),
    name: "Strategy 4",
    description: "Strategy 4 description",
    user_id: generateRandomNumber(1, 11)
    },
  {
    parameter_1: generateRandomNumber(1, 100),
    parameter_2: generateRandomNumber(1, 100),
    time_frame_id: generateRandomNumber(1, 14),
    name: "Strategy 5",
    description: "Strategy 5 description",
    user_id: generateRandomNumber(1, 11),
  },
];

const SeedDatabase = async () => {
  let connection;
  try {
    connection = await AppDataSource.initialize();
    await connection.manager.save(Role, roleSeedData);
    await connection.manager.save(User, userSeedData);
    await connection.manager.save(TimeFrame, timeFrameSeedData);
    await connection.manager.save(
      TechnicalResource,
      technicalResourcesSeedData
    );
    // for (const strategyData of strategySeedData) {
    //   // Create a simulated Request instance using mock-express-request
    //   const fakeRequest: Request = new (mockExpressRequest as any)({
    //     body: strategyData,
    //     token: {
    //       id: strategyData.user_id,
    //       role: '1' || '2',
    //       email: userSeedData[strategyData.user_id - 1].email,
    //     },
    //   } as any); // Provide a construction signature to avoid implicit 'any' type

    //   // Create a simulated Response instance
    //   const fakeResponse = express.response as express.Response;

    //   // Call the createStrategy function with the simulated request
    //   await createStrategy(fakeRequest, fakeResponse);
    // }
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      await connection.destroy();
    }
  }
};

SeedDatabase();
