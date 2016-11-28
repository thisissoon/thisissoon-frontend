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

# Volumes
VOLUME ["/etc/nginx"]

# Expose ports - 80 only
EXPOSE 80

CMD nginx