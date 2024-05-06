function hydrate<T>(htmlString: string, data: T): string {
  let returnedHTMLString = htmlString;

  for (const currentDataKey in data) {
    const element = data[currentDataKey];
    returnedHTMLString = returnedHTMLString.replaceAll(
      `#(${currentDataKey})#`,
      String(element),
    );
  }

  return returnedHTMLString;
}

export default hydrate;
