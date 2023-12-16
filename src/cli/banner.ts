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

export default (title: string, smallText: string | undefined) => {
  const data = figlet.textSync(title, {});
  if (!smallText) {
    return data;
  }

  const lineLength = maxLineLength(data);
  const padding = lineLength - smallText.length;
  return data + "\r\n" + " ".repeat(padding) + smallText + "\r\n";
};
