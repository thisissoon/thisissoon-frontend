# Pull alpine base image
FROM alpine:3.2

# Install Nginx
RUN apk add --update nginx && \
    rm -rf /var/cache/apk/*

# Add the grunt build dist to /thisissoon
COPY ./dist /thisissoon

WORKDIR /thisissoon

# Add nginx config - overwrite bundled nginx.conf
ADD nginx.conf /etc/nginx/
RUN chown -R nginx:nginx /var/log/nginx
RUN chown -R nginx:nginx /var/lib/nginx

# Volumes
VOLUME ["/etc/nginx"]

# Exposed ports
EXPOSE 80

CMD nginx