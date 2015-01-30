# Pull base image.
FROM nginx:1.7.6

# Add nginx config - overwrite bundled nginx.conf
ADD nginx.conf /etc/nginx/

# Volumes
VOLUME ["/etc/nginx"]

# Expose ports - 80 only, SSL will terminate at ELB
EXPOSE 80

# Add the grunt build dist to /thisissoon
ADD ./dist /thisissoon

