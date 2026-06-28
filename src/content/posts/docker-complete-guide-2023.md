---
title: Docker 实践指南
published: 2023-06-30
description: 容器�?/ 虚拟�?/ 部署 / DevOps / 云原�?image: ''
category: DevOps
tags:
  - Docker
  - 容器�?draft: false
---

## 1. Docker概述

### 1.1 什么是Docker
Docker是一个开源的容器化平台，允许开发者将应用程序和其依赖项打包到一个轻量级、可移植的容器中�?
**Docker的核心特性：**
- **一致�?*：在任何环境中运行都保持一�?- **轻量�?*：比传统虚拟机更轻量
- **快速部�?*：秒级启动和停止
- **版本控制**：镜像版本化管理
- **资源隔离**：容器间相互隔离

### 1.2 Docker架构
```
┌─────────────────────────────────────────────────────────────�?�?                   Docker Client                            �?├─────────────────────────────────────────────────────────────�?�?                   Docker Daemon                            �?├─────────────────────────────────────────────────────────────�?�? Registry  �? Images  �? Containers  �? Networks  �? Volumes �?└─────────────────────────────────────────────────────────────�?```

**核心组件�?*
- **Docker Client**：命令行工具，与Docker Daemon通信
- **Docker Daemon**：后台服务，管理容器生命周期
- **Registry**：镜像仓库（Docker Hub、私有仓库）
- **Images**：只读模板，用于创建容器
- **Containers**：运行中的镜像实�?- **Networks**：容器间通信网络
- **Volumes**：持久化数据存储

### 1.3 容器与虚拟机对比
| 特�?| 容器 | 虚拟�?|
|------|------|--------|
| 启动时间 | 秒级 | 分钟�?|
| 资源占用 | 轻量 | 较重 |
| 隔离级别 | 进程�?| 系统�?|
| 镜像大小 | MB�?| GB�?|
| 性能 | 接近原生 | 有损�?|

---

## 2. Docker安装与配�?
### 2.1 安装Docker
```
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# CentOS/RHEL
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker

# macOS
brew install docker
# 或下�?Docker Desktop

# Windows
# 下载 Docker Desktop for Windows
```

### 2.2 配置Docker
```
# 将用户添加到docker组（避免每次使用sudo�?sudo usermod -aG docker $USER
# 重新登录生效

# 配置镜像加速器（中国用户）
bash <(curl -sSL https://xuanyuan.cloud/docker.sh)

# 验证安装
docker --version
docker run hello-world
```

```
Docker version 20.10.21, build baeda1f
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## 3. 镜像操作

### 3.1 镜像基础命令
```
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest
docker pull ubuntu:20.04
docker pull python:3.9-slim

# 查看本地镜像
docker images
docker image ls

# 查看镜像详细信息
docker inspect nginx:latest

# 删除镜像
docker rmi nginx:latest
docker image rm ubuntu:20.04

# 强制删除镜像（即使有容器在使用）
docker rmi -f nginx:latest

# 清理未使用的镜像
docker image prune -a
```

```
# docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    f652ca386ed0   2 weeks ago    141MB
ubuntu       20.04     ba6acccedd29   3 weeks ago    72.8MB
python       3.9-slim  a7b92c8b0b1c   4 weeks ago    113MB

# docker search nginx
NAME                           DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
nginx                          Official build of Nginx.                       18500     [OK]
jwilder/nginx-proxy           Automated Nginx reverse proxy for docker c...   2089                 [OK]
richarvey/nginx-php-fpm       Container running Nginx + PHP-FPM capable o...   820                  [OK]
```

### 3.2 镜像标签和推�?```
# 给镜像打标签
docker tag nginx:latest my-nginx:v1.0
docker tag ubuntu:20.04 mycompany/ubuntu:latest

# 推送镜像到仓库
docker push mycompany/ubuntu:latest

# 从私有仓库拉取镜�?docker pull registry.example.com/myapp:v1.0

# 登录Docker Hub
docker login
# 输入用户名和密码

# 登出
docker logout
```

### 3.3 镜像历史和信�?```
# 查看镜像构建历史
docker history nginx:latest

# 查看镜像详细信息
docker inspect nginx:latest | grep -A 10 "Config"

# 导出镜像为tar文件
docker save -o nginx.tar nginx:latest

# 从tar文件导入镜像
docker load -i nginx.tar

# 查看镜像占用空间
docker system df
```

---

## 4. 容器管理

### 4.1 容器基本操作
```
# 运行容器
docker run nginx:latest
docker run -d nginx:latest  # 后台运行
docker run -it ubuntu:20.04 /bin/bash  # 交互式运�?
# 查看运行中的容器
docker ps
docker container ls

# 查看所有容器（包括停止的）
docker ps -a

# 停止容器
docker stop <container_id>
docker stop <container_name>

# 启动已停止的容器
docker start <container_id>

# 重启容器
docker restart <container_id>

# 删除容器
docker rm <container_id>
docker container prune  # 删除所有停止的容器
```

```
# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
abc123def456   nginx     "/docker-entrypoint.�?   2 minutes ago   Up 2 minutes   80/tcp    nginx-container

# docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS                     PORTS     NAMES
abc123def456   nginx          "/docker-entrypoint.�?   2 minutes ago   Up 2 minutes               80/tcp    nginx-container
def456ghi789   ubuntu:20.04   "/bin/bash"              5 minutes ago   Exited (0) 3 minutes ago             ubuntu-test
```

### 4.2 容器高级操作
```
# 进入运行中的容器
docker exec -it <container_id> /bin/bash
docker exec -it nginx-container /bin/sh

# 查看容器日志
docker logs <container_id>
docker logs -f <container_id>  # 实时查看日志
docker logs --tail 100 <container_id>  # 查看最�?00�?
# 查看容器资源使用情况
docker stats

# 复制文件到容�?docker cp local_file.txt <container_id>:/path/in/container/

# 从容器复制文�?docker cp <container_id>:/path/in/container/file.txt ./

# 提交容器为镜�?docker commit <container_id> my-nginx:v1.1
```

### 4.3 容器端口映射与网�?```
# 端口映射
docker run -d -p 8080:80 nginx:latest  # 主机8080端口映射到容�?0端口
docker run -d -p 3000:3000 -p 8080:80 myapp:latest  # 多端口映�?
# 指定容器名称
docker run -d --name my-nginx -p 8080:80 nginx:latest

# 设置环境变量
docker run -d -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0

# 挂载数据�?docker run -d -v /host/path:/container/path nginx:latest
docker run -d -v nginx_data:/usr/share/nginx/html nginx:latest

# 使用自定义网�?docker network create my-network
docker run -d --network my-network --name web nginx:latest
docker run -d --network my-network --name db mysql:8.0
```

---

## 5. Dockerfile与镜像构�?
### 5.1 Dockerfile基础语法
```
# 基础镜像
FROM ubuntu:20.04

# 维护者信�?LABEL maintainer="your-email@example.com"

# 设置工作目录
WORKDIR /app

# 复制文件
COPY requirements.txt .
COPY src/ ./src/

# 安装依赖
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install -r requirements.txt

# 暴露端口
EXPOSE 8080

# 设置环境变量
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# 启动命令
CMD ["python3", "app.py"]
```

### 5.2 多阶段构�?```
# 构建阶段
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 5.3 构建镜像
```
# 构建镜像
docker build -t myapp:v1.0 .
docker build -f Dockerfile.prod -t myapp:prod .

# 指定构建参数
docker build --build-arg VERSION=1.0 -t myapp:v1.0 .

# 不使用缓存构�?docker build --no-cache -t myapp:v1.0 .

# 查看构建历史
docker history myapp:v1.0
```

```
# docker build -t myapp:v1.0 .
Sending build context to Docker daemon  2.048kB
Step 1/8 : FROM python:3.9-slim
 ---> a7b92c8b0b1c
Step 2/8 : WORKDIR /app
 ---> Running in abc123def456
 ---> def456ghi789
Step 3/8 : COPY requirements.txt .
 ---> abc123def456
Step 4/8 : RUN pip install -r requirements.txt
 ---> Running in def456ghi789
Collecting flask==2.0.1
  Downloading flask-2.0.1-py3-none-any.whl (94 kB)
Installing collected packages: flask
Successfully installed flask-2.0.1
 ---> ghi789jkl012
Step 5/8 : COPY . .
 ---> jkl012mno345
Step 6/8 : EXPOSE 8080
 ---> Running in mno345pqr678
 ---> pqr678stu901
Step 7/8 : ENV FLASK_APP=app.py
 ---> Running in stu901vwx234
 ---> vwx234yza567
Step 8/8 : CMD ["python", "app.py"]
 ---> Running in yza567bcd890
 ---> bcd890efg123
Successfully built bcd890efg123
Successfully tagged myapp:v1.0
```

---

## 6. Docker Compose编排

### 6.1 docker-compose.yml基础
```
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:6-alpine
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### 6.2 Compose命令操作
```
# 启动服务
docker-compose up
docker-compose up -d  # 后台运行
docker-compose up --build  # 重新构建镜像

# 停止服务
docker-compose down
docker-compose down -v  # 同时删除数据�?
# 查看服务状�?docker-compose ps
docker-compose logs
docker-compose logs web  # 查看特定服务日志

# 进入服务容器
docker-compose exec web bash
docker-compose exec db psql -U user -d myapp

# 重启服务
docker-compose restart web

# 扩展服务实例
docker-compose up --scale web=3
```

```
# docker-compose up -d
Creating network "myapp_app-network" ... done
Creating volume "myapp_postgres_data" ... done
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done

# docker-compose ps
     Name                    Command               State           Ports
--------------------------------------------------------------------------------
myapp_db_1      docker-entrypoint.sh postgres    Up      5432/tcp
myapp_redis_1   docker-entrypoint.sh redis ...   Up      6379/tcp
myapp_web_1     python app.py                    Up      0.0.0.0:8080->8080/tcp
```

### 6.3 高级Compose配置
```
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
      args:
        - VERSION=1.0
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - web
```

---

## 7. 网络管理

### 7.1 Docker网络
```
# 查看网络列表
docker network ls

# 创建自定义网�?docker network create my-network
docker network create --driver bridge --subnet 172.18.0.0/16 my-network

# 连接容器到网�?docker network connect my-network container1
docker network disconnect my-network container1

# 查看网络详细信息
docker network inspect my-network

# 删除网络
docker network rm my-network
docker network prune  # 删除未使用的网络
```

```
# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
abc123def456   bridge    bridge    local
def456ghi789   host      host      local
ghi789jkl012   none      null      local
jkl012mno345   my-network bridge    local

# docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "abc123def456",
        "Created": "2023-06-30T10:00:00.000000000Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        }
    }
]
```

## 8. 存储管理

### 8.1 数据卷管�?```
# 创建数据�?docker volume create my-data

# 查看数据卷列�?docker volume ls

# 查看数据卷详细信�?docker volume inspect my-data

# 删除数据�?docker volume rm my-data
docker volume prune  # 删除未使用的数据�?
# 备份数据�?docker run --rm -v my-data:/data -v $(pwd):/backup ubuntu tar czf /backup/my-data.tar.gz -C /data .

# 恢复数据�?docker run --rm -v my-data:/data -v $(pwd):/backup ubuntu tar xzf /backup/my-data.tar.gz -C /data
```

### 8.2 绑定挂载
```
# 绑定挂载目录
docker run -d -v /host/path:/container/path nginx:latest

# 挂载单个文件
docker run -d -v /host/config.json:/app/config.json myapp:latest

# 只读挂载
docker run -d -v /host/path:/container/path:ro nginx:latest

# 使用命名�?docker run -d -v nginx_data:/usr/share/nginx/html nginx:latest
```

---

## 9. 应用容器化示�?
### 9.1 Python Flask应用容器�?```
# app.py
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({
        'message': 'Hello from Docker!',
        'version': os.getenv('VERSION', '1.0')
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

```
# requirements.txt
Flask==2.0.1
gunicorn==20.1.0
```

```
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

ENV VERSION=1.0

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
```

```
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      - VERSION=1.0
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
```

### 9.2 Node.js应用容器�?```
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

### 9.3 构建和部�?```
# 构建镜像
docker build -t myapp:v1.0 .

# 运行容器
docker run -d -p 8080:8080 --name myapp myapp:v1.0

# 使用Compose部署
docker-compose up -d

# 查看应用状�?curl http://localhost:8080/
curl http://localhost:8080/health

# 查看日志
docker logs myapp
docker-compose logs web
```

```
# curl http://localhost:8080/
{
  "message": "Hello from Docker!",
  "version": "1.0"
}

# curl http://localhost:8080/health
{
  "status": "healthy"
}
```

---

## 10. 监控与调�?
### 10.1 容器检查命�?```
# 查看容器详细信息
docker inspect <container_id>

# 查看容器资源使用
docker stats --no-stream

# 进入容器调试
docker exec -it <container_id> /bin/bash

# 查看容器进程
docker top <container_id>
```

### 10.2 日志管理
```
# 查看容器日志
docker logs <container_id>

# 实时查看日志
docker logs -f <container_id>

# 查看最�?00�?docker logs --tail 100 <container_id>
```

```
# docker-compose.yml 日志配置
version: '3.8'

services:
  web:
    build: .
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## 11. 最佳实�?
### 11.1 镜像优化
```
# 多阶段构建优�?FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 使用.dockerignore文件
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
```

### 11.2 安全实践
```
# 使用非root用户
FROM node:16-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# 最小化攻击�?FROM alpine:latest
RUN apk add --no-cache nginx

# 扫描镜像漏洞
docker scan myapp:v1.0
```

### 11.3 资源限制
```
# 资源限制
docker run -d \
  --memory=512m \
  --cpus=1.0 \
  --pids-limit=100 \
  myapp:v1.0

# 清理系统
docker system prune -a
docker builder prune

# 监控容器资源
docker stats
```

---

## 12. 高级主题

### 12.1 Docker Swarm集群
```
# 初始化Swarm
docker swarm init

# 添加工作节点
docker swarm join --token <token> <manager-ip>:2377

# 部署服务
docker service create --name web --replicas 3 -p 8080:8080 myapp:v1.0

# 查看服务
docker service ls
docker service ps web

# 扩展服务
docker service scale web=5
```

### 12.2 私有镜像仓库
```
# 运行私有仓库
docker run -d -p 5000:5000 --name registry registry:2

# 推送镜像到私有仓库
docker tag myapp:v1.0 localhost:5000/myapp:v1.0
docker push localhost:5000/myapp:v1.0

# 从私有仓库拉�?docker pull localhost:5000/myapp:v1.0
```

## 参考资�?- Docker官方文档：https://docs.docker.com/
- Docker Hub：https://hub.docker.com/
- Docker Compose文档：https://docs.docker.com/compose/
