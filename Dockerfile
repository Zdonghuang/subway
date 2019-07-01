FROM bitnami/nginx
COPY ./dist /app
COPY my_vhost.conf /opt/bitnami/nginx/conf/vhosts/
#COPY ./dist /opt/bitnami/nginx/html
EXPOSE 8080

