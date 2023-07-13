# 使用官方Nginx镜像
FROM nginx:alpine

# 删除nginx 默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 添加自己的配置 default.conf
ADD default.conf /etc/nginx/conf.d/

# 把dist文件下的文件，复制到nginx下默认解析的静态文件夹html下
COPY ./dist/ /usr/share/nginx/html/
