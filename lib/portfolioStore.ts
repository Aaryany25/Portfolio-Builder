import fs from "fs/promises";
import path from "path";
import { UserProfileData, DEFAULT_PORTFOLIO } from "./portfolioTypes";

export * from "./portfolioTypes";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "portfolios.json");

async function ensureDirectoryExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Ignore directory exists error
  }
}

export async function readAllPortfolios(): Promise<Record<string, UserProfileData>> {
  try {
    await ensureDirectoryExists();
    const fileContent = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return {};
  }
}

export async function getPortfolioByUserId(userId: string): Promise<UserProfileData> {
  if (!userId) return DEFAULT_PORTFOLIO;
  const store = await readAllPortfolios();
  const normalizedKey = userId.toLowerCase().trim();
  if (store[normalizedKey]) {
    return store[normalizedKey];
  }
  // Search by email or githubUsername
  for (const key of Object.keys(store)) {
    const item = store[key];
    if (
      item.email?.toLowerCase() === normalizedKey ||
      item.githubUsername?.toLowerCase() === normalizedKey ||
      item.userId?.toLowerCase() === normalizedKey
    ) {
      return item;
    }
  }
  return {
    ...DEFAULT_PORTFOLIO,
    userId: normalizedKey,
    updatedAt: new Date().toISOString()
  };
}

export async function savePortfolioData(data: UserProfileData): Promise<UserProfileData> {
  await ensureDirectoryExists();
  const store = await readAllPortfolios();
  const key = (data.userId || data.email || data.githubUsername || "default").toLowerCase().trim();
  
  const updatedRecord: UserProfileData = {
    ...data,
    userId: key,
    updatedAt: new Date().toISOString()
  };

  store[key] = updatedRecord;
  await fs.writeFile(FILE_PATH, JSON.stringify(store, null, 2), "utf-8");
  return updatedRecord;
}
