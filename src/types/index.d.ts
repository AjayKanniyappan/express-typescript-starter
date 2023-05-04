declare namespace ETS {
  interface ServerError {
    code: string;
    errno: number;
    syscall: string;
    address: string;
    port: number;
  }
}
