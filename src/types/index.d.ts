declare namespace ETS {
  interface DatabaseMap {
    [key: string]: mongoose.Connection;
  }

  interface ServerError {
    code: string;
    errno: number;
    syscall: string;
    address: string;
    port: number;
  }
}
