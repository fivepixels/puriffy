export interface OnBlogHydrationReturn {
  randomNumber: number;
}

type RandomNumberAPIReturn = number[];
const OnHydration = async (): Promise<OnBlogHydrationReturn> => {
  const randomNumberResposne = await fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=0&max=10&count=1"
  );
  const randomNumberBody =
    (await randomNumberResposne.json()) as RandomNumberAPIReturn;

  return {
    randomNumber: randomNumberBody[0]
  };
};

export default {
  OnHydration
};
