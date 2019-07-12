FROM hub.yun.paic.com.cn/library/nginx:1.13.3
MAINTAINER hanliangliang007

ADD ./caas/nginx/nginx.tmpl /etc/nginx/conf.d/default.tmpl
ADD ./web /data/www
RUN chown -R root:101 /data/www
CMD envsubst '' < /etc/nginx/conf.d/default.tmpl > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
