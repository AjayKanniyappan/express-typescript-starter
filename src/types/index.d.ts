declare namespace ETS {
  type Colors = {
    [key: string]: string | number | undefined;
  };

  type Config = {
    [key: string]: string | number | undefined;
    CORS_ORIGIN: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    PORT: number;
    SECRET_KEY: string;
  };

  interface User {
    name: string;
    email: string;
    password: string;
  }

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
