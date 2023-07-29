export default async function (index: number) {
  return new Promise((resolve) => setTimeout(resolve, index * 3000));
}
