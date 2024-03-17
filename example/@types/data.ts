type updateDataFunction<T> = () => T | Promise<T>;

interface StaticDataReceive<T> {
  id: string;
  configuration?: staticDataConfiguration;
  updateFunction?: updateDataFunction<T>;
}

interface staticDataConfiguration {
  safe: boolean;
}

export class StaticData<T> {
  public filled: boolean;
  private dataId: string;
  private data: T | null;
  private configuration?: staticDataConfiguration;

  constructor({ id, updateFunction, configuration }: StaticDataReceive<T>) {
    this.filled = false;
    this.dataId = id;
    this.data = null;
    this.configuration = configuration;

    if (updateFunction) this.update(updateFunction);
  }

  public async update(updateFunction: updateDataFunction<T>): Promise<boolean> {
    try {
      this.data = await updateFunction();
      this.filled = true;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public get(): T | null {
    const safeByDefault = this.configuration?.safe;

    if (!safeByDefault) {
      return this.data;
    }

    if (this.filled) {
      return this.data;
    }

    console.error("");
    return null;
  }
}
