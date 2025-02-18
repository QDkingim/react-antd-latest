import Mock from "mockjs";
Mock.setup({
  timeout: "200-600",
});
// Login API
Mock.mock("/api/login", "post", options => {
  const { username, password } = JSON.parse(options.body);
  if (username === "admin" && password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "fake-token",
        user: {
          username: "admin",
          role: "admin",
        },
      },
    };
  } else {
    return {
      code: 401,
      message: "用户名或密码错误",
    };
  }
});

Mock.mock("/api/logout", "post", () => {
  return {
    code: 200,
    message: "登出成功",
  };
});

// List API
Mock.mock("/api/list", "get", () => {
  return {
    code: 200,
    message: "获取商品列表成功",
    data: Mock.mock({
      "items|10-20": [
        {
          "id|+1": 1,
          name: "@ctitle(5, 10)",
          price: "@float(100, 1000, 2, 2)",
          description: "@cparagraph(1, 3)",
          image: "@image('200x200', '#50B347', '#FFF', 'Mock.js')",
        },
      ],
    }),
  };
});
