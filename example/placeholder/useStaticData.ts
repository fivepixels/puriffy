class useStaticData<T> {
  private staticData: T;

  constructor() {
    this.staticData = {} as T;
  }

  public use(field: keyof T) {
    // this method is supposed to return an object that marks and reminds the compiler to know that this is where the data is used.

    return this.staticData[field];
  }
}

export default useStaticData;
