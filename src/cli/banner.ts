import figlet from "figlet";

const maxLineLength = (data: string) => {
  return (
    data
      .split("\n")
      .map((line) => line.length)
      .sort()
      .pop() || 0
  );
};

export default (title: string, smallText?: string) => {
  const data = figlet.textSync(title, {});
  if (!smallText) {
    return data;
  }

  const lineLength = maxLineLength(data);
  const padding = Math.max(lineLength - smallText.length, 0);
  return data + "\r\n" + " ".repeat(padding) + smallText + "\r\n";
};
