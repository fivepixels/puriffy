import { readFile } from "fs/promises";

export interface OnGuestbookCompilationReturn {
  title: string;
  description: string;
  warningText: string;
}
export interface OnGuestbookHydrationReturn {
  comments: Comment[];
}

export interface UserDatabase {
  users: User[];
  comments: Comment[];
}

export interface User {
  username: string;
  age: number;
}

export interface Comment {
  author: string;
  commentedAt: string;
  content: string;
}

const OnCompilation = (): OnGuestbookCompilationReturn => {
  return {
    title: "Guestbook",
    description: "Here, you can write anything.",
    warningText: "Do not enter something inappropriate."
  };
};

const OnHydration = async (): Promise<OnGuestbookHydrationReturn> => {
  const fileContent = await readFile("../../data/database.json", "utf-8");
  const data: UserDatabase = JSON.parse(fileContent);

  return {
    comments: data.comments
  };
};

export default {
  OnCompilation,
  OnHydration
};
