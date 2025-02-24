import Mock from "mockjs";
Mock.setup({
  timeout: "200-600",
});
// Login API
const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "难凉热血",
    avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "可以看到除户管理页面之外的所有页面",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "仅能看到Dashboard、作者博客、权限测试和关于作者四个页面",
  },
};
Mock.mock("/api/login", "post", options => {
  const { username, password } = JSON.parse(options.body);
  const token = tokens[username];
  if (!token) {
    return {
      code: 500,
      message: "用户名或密码错误",
    };
  } else {
    return {
      code: 200,
      message: "登录成功",
      data: token,
    };
  }
});

Mock.mock("/api/logout", "post", () => {
  return {
    code: 200,
    message: "登出成功",
  };
});

// User Info API
Mock.mock("/api/userInfo", "post", options => {
  const { token } = JSON.parse(options.body);
  const userInfo = users[token];
  if (!userInfo) {
    return {
      code: 500,
      message: "无效的token",
    };
  }

  return {
    code: 200,
    message: "获取用户信息成功",
    data: userInfo,
  };
});
